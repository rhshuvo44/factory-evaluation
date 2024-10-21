import { baseApi } from "../../api/api";


const productionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduction: builder.query({
            query: () => (
                { url: `/production-report`, method: 'GET' }
            ), providesTags: ['production'],
        }),
        createProduction: builder.mutation({
            query: (data) => ({
                url: '/production-report',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['production'],
        }),
        getTodayProduction: builder.query({
            query: () => (
                { url: `/production-report/today`, method: 'GET' }
            ), providesTags: ['production'],
        }),
        updateProduction: builder.mutation({
            query: (data) => ({
                url: `/production-report/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['production'],
        }),
        singleProduction: builder.query({
            query: (id) => ({
                url: `/production-report/${id}`,
                method: 'GET',
            }),
        }),
        deletedProduction: builder.mutation({
            query: (id) => ({
                url: `/production-report/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['production'],
        }),
    })
});




export const { useCreateProductionMutation, useGetAllProductionQuery, useDeletedProductionMutation, useSingleProductionQuery, useUpdateProductionMutation, useGetTodayProductionQuery } = productionApi;