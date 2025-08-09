/* eslint-disable @typescript-eslint/no-explicit-any */
// baseApi.ts
import { createApi, fetchBaseQuery, type FetchArgs, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";


const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.log("Trying refresh token");
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    const newToken = (refreshResult.data as any)?.data;

    if (newToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: newToken }));
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
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
