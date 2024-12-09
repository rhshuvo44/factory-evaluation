import { baseApi } from "../../api/api";


const outputApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOutputs: builder.query({
            query: () => (
                { url: `/output`, method: 'GET' }),

            providesTags: ['Output'],
        }),
        getAllOutputsDownload: builder.query<Blob, void>({
            query: () => (
                {
                    url: `/output/production-reports/download`, method: 'GET',
                    responseHandler: (response) => response.blob(),
                }),

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




export const { useCreateOutputMutation, useGetAllOutputsQuery, useDeletedOutputMutation, useLazyGetAllOutputsDownloadQuery } = outputApi;