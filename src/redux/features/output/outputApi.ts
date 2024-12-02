import { baseApi } from "../../api/api";


const outputApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOutputs: builder.query({
            query: () => (
                { url: `/output`, method: 'GET' }),

            providesTags: ['Output'],
        }),

        createOutput: builder.mutation({
            query: (outputData) => ({
                url: '/output',
                method: 'POST',
                body: outputData,
            }),
            invalidatesTags: ['Output'],
        }),
        deletedOutput: builder.mutation({
            query: (id) => ({
                url: `/output/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['Output'],
        }),
    })
});




export const { useCreateOutputMutation, useGetAllOutputsQuery, useDeletedOutputMutation } = outputApi;