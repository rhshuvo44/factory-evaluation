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
    }),
})

export const { useCreateFactoryDevelopMutation, useGetAllFactoryDevelopsQuery } = factoryDevelopmentApi 