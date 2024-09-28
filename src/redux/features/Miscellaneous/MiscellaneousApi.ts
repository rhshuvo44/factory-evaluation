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
    }),
});


export const { useGetAllMiscellaneousQuery, useCreateMiscellaneousMutation } = miscellaneousApi;