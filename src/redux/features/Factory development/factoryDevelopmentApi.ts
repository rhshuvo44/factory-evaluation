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
            invalidatesTags: ['Factory'],
        }),
        updateFactoryDevelops: builder.mutation({
            query: (data) => ({
                url: `/factory-development/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Factory'],
        }),
        singleFactoryDevelops: builder.query({
            query: (id) => ({
                url: `/factory-development/${id}`,
                method: 'GET',
            }),
        }),
        deletedFactory: builder.mutation({
            query: (id) => ({
                url: `/factory-development/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Factory'],
        }),
    }),
})

export const { useCreateFactoryDevelopMutation, useGetAllFactoryDevelopsQuery, useDeletedFactoryMutation, useSingleFactoryDevelopsQuery, useUpdateFactoryDevelopsMutation } = factoryDevelopmentApi 