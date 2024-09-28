import { baseApi } from "../../api/api";

const miscellaneousApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMiscellaneous: builder.query({
            query: () => ({ url: '/miscellaneous', method: 'GET' }), providesTags: ['Miscellaneous'],
        }),
        createMiscellaneous: builder.mutation({
            query: (data) => ({
                url: '/miscellaneous',
                method: 'POST',
                body: data,
            }),
        }),
        deleteMiscellaneous: builder.mutation({
            query: (id) => ({
                url: `/miscellaneous/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});


export const { useGetAllMiscellaneousQuery, useCreateMiscellaneousMutation, useDeleteMiscellaneousMutation } = miscellaneousApi;