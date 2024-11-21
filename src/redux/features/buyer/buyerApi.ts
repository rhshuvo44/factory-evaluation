import { baseApi } from "../../api/api";


const buyerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllBuyer: builder.query({
            query: () => ({
                url: '/buyer',
                method: 'GET',
            }),
            providesTags: ['Buyer'],
        }),
        getTodayBuyer: builder.query({
            query: (queryParams) => (
                { url: `/buyer/today?date=${queryParams.date}`, method: 'GET' }
            ), providesTags: ['Buyer'],
        }),
        createBuyer: builder.mutation({
            query: (travellingData) => ({
                url: '/buyer',
                method: 'POST',
                body: travellingData,
            }),
            invalidatesTags: ['Buyer'],
        }),
        deleteBuyer: builder.mutation({
            query: (id) => ({
                url: `/buyer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Buyer'],
        }),
        updateBuyer: builder.mutation({
            query: (data) => ({
                url: `/buyer/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Buyer'],
        }),
        singleBuyer: builder.query({
            query: (id) => ({
                url: `/buyer/${id}`,
                method: 'GET',
            }),
        }),
        GetAllBuyerOrderNo: builder.query({
            query: () => ({
                url: `/buyer/orderNumber`,
                method: 'GET',
            }),
        }),


    })
});




export const { useCreateBuyerMutation, useGetAllBuyerQuery, useDeleteBuyerMutation, useUpdateBuyerMutation, useSingleBuyerQuery, useGetTodayBuyerQuery, useGetAllBuyerOrderNoQuery } = buyerApi;