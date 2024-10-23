import { baseApi } from "../../api/api";

const miscellaneousApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMiscellaneous: builder.query({
            query: () => ({ url: '/miscellaneous', method: 'GET' }), providesTags: ['Miscellaneous'],
        }),
        getTodayMiscellaneous: builder.query({
            query: (queryParams) => (
                { url: `/miscellaneous/today?date=${queryParams.date}`, method: 'GET' }
            ), providesTags: ['Miscellaneous'],
        }),
        getSingleMiscellaneous: builder.query({
            query: (id) => ({ url: `/miscellaneous/${id}`, method: 'GET' }),
        }),
        createMiscellaneous: builder.mutation({
            query: (data) => ({
                url: '/miscellaneous',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Miscellaneous'],
        }),
        updateMiscellaneous: builder.mutation({
            query: (data) => ({
                url: `/miscellaneous/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Miscellaneous'],
        }),
        deleteMiscellaneous: builder.mutation({
            query: (id) => ({
                url: `/miscellaneous/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Miscellaneous'],
        }),
    }),
});


export const { useGetAllMiscellaneousQuery, useCreateMiscellaneousMutation, useDeleteMiscellaneousMutation, useGetSingleMiscellaneousQuery, useUpdateMiscellaneousMutation, useGetTodayMiscellaneousQuery } = miscellaneousApi;