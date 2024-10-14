import { baseApi } from "../../api/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({ url: '/user', method: 'GET' }),
            providesTags: ['User'],
        }),
        getMe: builder.query({
            query: () => ({ url: '/user/me', method: 'GET' }),
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: '/user/create-user',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['User'],

        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',

            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/user/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['User'],

        }),
    }),
});

export const { useCreateUserMutation, useGetUserQuery, useDeleteUserMutation, useGetMeQuery, useUpdateUserMutation, useGetSingleUserQuery } = userApi