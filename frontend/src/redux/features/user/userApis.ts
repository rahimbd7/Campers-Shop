import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/users/get-all-user",
            }),
            providesTags: ["User"],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/get-user/${id}`,
            }),
            providesTags:  (_result, _error, id) => [{ type: "User", id }],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: "/users/create-user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: ({id,...rest}) => ({
                url: `/users/update-user/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/delete-user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;