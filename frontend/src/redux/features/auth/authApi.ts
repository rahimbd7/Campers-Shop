import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo
            }),
        }),
        firebaseLogin: builder.mutation({
            query: (token:string) => ({
                url: "/auth/firebase-login",
                method: "POST",
                body: {token}
            }),
        })
    }),
});

export const { useLoginMutation, useFirebaseLoginMutation } = authApi;