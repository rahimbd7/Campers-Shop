import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/users/get-all-user",
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/get-user/${id}`,
            }),
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: "/users/create-user",
                method: "POST",
                body: user,
            }),
        }),
        updateUser: builder.mutation({
            query: ({id,...rest}) => ({
                url: `/users/update-user/${id}`,
                method: "PUT",
                body: rest,
                
                
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/delete-user/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;