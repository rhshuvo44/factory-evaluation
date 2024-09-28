import { baseApi } from "../../api/api";

const factoryDevelopmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFactoryDevelops: builder.query({
            query: () => ({ url: `/factory-development`, method: 'GET' }), providesTags: ['Factory'],
        }),
        createFactoryDevelop: builder.mutation({
            query: (data) => ({
                url: '/factory-development',
                method: 'POST',
                body: data,
            }),
        }),
        deletedFactory: builder.mutation({
            query: (id) => ({
                url: `/factory-development/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useCreateFactoryDevelopMutation, useGetAllFactoryDevelopsQuery, useDeletedFactoryMutation } = factoryDevelopmentApi 