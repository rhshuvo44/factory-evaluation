import { baseApi } from "../../api/api";


const buyerDevelopmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllBuyerDevelopment: builder.query({
            query: () => ({
                url: '/buyer-development',
                method: 'GET',
            }),
            providesTags: ['Buyer Development'],
        }),
        getTodayBuyerDevelopment: builder.query({
            query: () => (
                { url: `/buyer-development/today`, method: 'GET' }
            ), providesTags: ['Buyer Development'],
        }),
        createBuyerDevelopment: builder.mutation({
            query: (travellingData) => ({
                url: '/buyer-development',
                method: 'POST',
                body: travellingData,
            }),
            invalidatesTags: ['Buyer Development'],
        }),
        deleteBuyerDevelopment: builder.mutation({
            query: (id) => ({
                url: `/buyer-development/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Buyer Development'],
        }),
        updateBuyerDevelopment: builder.mutation({
            query: (data) => ({
                url: `/buyer-development/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Buyer Development'],
        }),
        singleBuyerDevelopment: builder.query({
            query: (id) => ({
                url: `/buyer-development/${id}`,
                method: 'GET',
            }),
        }),


    })
});




export const { useCreateBuyerDevelopmentMutation, useGetAllBuyerDevelopmentQuery, useDeleteBuyerDevelopmentMutation, useUpdateBuyerDevelopmentMutation, useSingleBuyerDevelopmentQuery, useGetTodayBuyerDevelopmentQuery } = buyerDevelopmentApi;