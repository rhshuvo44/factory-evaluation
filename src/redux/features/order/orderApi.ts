import { baseApi } from "../../api/api";


const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllOrder: builder.query({
            query: () => ({
                url: '/order',
                method: 'GET',
            }),
            providesTags: ['order'],
        }),
        getTodayOrder: builder.query({
            query: (queryParams) => (
                { url: `/order/today?date=${queryParams.date}`, method: 'GET' }
            ), providesTags: ['order'],
        }),
        createOrder: builder.mutation({
            query: (travellingData) => ({
                url: '/order',
                method: 'POST',
                body: travellingData,
            }),
            invalidatesTags: ['order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['order'],
        }),
        updateOrder: builder.mutation({
            query: (data) => ({
                url: `/order/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['order'],
        }),
        singleOrder: builder.query({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'GET',
            }),
        }),
        GetAllOrderNo: builder.query({
            query: () => ({
                url: `/order/orderNumber`,
                method: 'GET',
            }),
        }),


    })
});




export const { useCreateOrderMutation, useGetAllOrderQuery, useDeleteOrderMutation, useUpdateOrderMutation, useSingleOrderQuery, useGetTodayOrderQuery, useGetAllOrderNoQuery } = orderApi;