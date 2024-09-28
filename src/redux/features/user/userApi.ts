import { baseApi } from "../../api/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({ url: '/user', method: 'GET' }),
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: '/user/create-user',
                method: 'POST',
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',

            }),
        }),
    }),
});

export const { useCreateUserMutation, useGetUserQuery, useDeleteUserMutation } = userApi