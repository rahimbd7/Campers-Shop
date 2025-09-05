/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  type FetchArgs,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setBackendUser, setFirebaseUser } from "../features/auth/authSlice";
import { getAuth } from "firebase/auth";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include", // ✅ sends refreshToken cookie for backend login
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/**
 * 🔑 Refresh Strategies
 * Each user type (backend / firebase) has its own refresh logic.
 */
const refreshStrategies = {
  backend: async (api: any, extraOptions: any, args: FetchArgs) => {
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    const newToken = (refreshResult.data as any)?.data;
    if (newToken) {
      const user = (api.getState() as RootState).auth.backendUser;
      if (user) {
        api.dispatch(setBackendUser({ user, token: newToken }));
        return await rawBaseQuery(args, api, extraOptions);
      }
      }
    api.dispatch(logout());
    return refreshResult;
  },

  firebase: async (api: any, extraOptions: any, args: FetchArgs) => {
    try {
      const auth = getAuth();
      const newFirebaseToken = await auth.currentUser?.getIdToken(true);
      if (newFirebaseToken) {
        const user = (api.getState() as RootState).auth.firebaseUser;
       if (user) {
          api.dispatch(setFirebaseUser({ user, token: newFirebaseToken }));
          return await rawBaseQuery(args, api, extraOptions);
        }
      }
    } catch (err) {
      console.error("❌ Firebase refresh failed:", err);
    }
    api.dispatch(logout());
    return { error: { status: 401, data: "Unauthorized" } };
  },
};

const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // console.log("🔄 Token expired, attempting refresh...");

    const { backendUser, firebaseUser } = (api.getState() as RootState).auth;

    if (backendUser) {
      result = await refreshStrategies.backend(api, extraOptions, args);
    } else if (firebaseUser) {
      result = await refreshStrategies.firebase(api, extraOptions, args);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category", "Product", "User", "Cart", "Order"],
  endpoints: () => ({}),
});

export default baseApi;