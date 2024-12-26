import { baseApi } from "../../api/api";


const productionCostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProductionCosts: builder.query({
            query: () => (
                { url: `/production-cost`, method: 'GET' }),
            providesTags: ['ProductionCost'],
        }),
        getTodayProductionCosts: builder.query({
            query: (queryParams) => {
                return { url: `/production-cost/today?date=${queryParams.date}`, method: 'GET' }
            }, providesTags: ['ProductionCost'],
        }),
        createProductionCost: builder.mutation({
            query: (ProductionCostData) => ({
                url: '/production-cost',
                method: 'POST',
                body: ProductionCostData,
            }),
            invalidatesTags: ['ProductionCost'],
        }),
        updateProductionCost: builder.mutation({
            query: (data) => ({
                url: `/production-cost/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['ProductionCost'],
        }),
        singleProductionCost: builder.query({
            query: (id) => ({
                url: `/production-cost/${id}`,
                method: 'GET',
            }),
        }),
        deletedProductionCost: builder.mutation({
            query: (id) => ({
                url: `/production-cost/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['ProductionCost'],
        }),
    })
});




export const { useCreateProductionCostMutation, useDeletedProductionCostMutation, useGetAllProductionCostsQuery, useGetTodayProductionCostsQuery, useUpdateProductionCostMutation, useSingleProductionCostQuery } = productionCostApi;