import { baseApi } from "../../api/api";


const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query({
            query: () => (
                { url: `/report`, method: 'GET' }),

            providesTags: ['report'],
        }),
        getAllReportsDownload: builder.query<Blob, void>({
            query: () => (
                {
                    url: `/report/download`, method: 'GET',
                    responseHandler: (response) => response.blob(),
                }),
            // async onCacheEntryAdded(arg, { cacheEntryRemoved }) {
            //     await cacheEntryRemoved;
            // }

        }),
        createReport: builder.mutation({
            query: (reportData) => ({
                url: '/report',
                method: 'POST',
                body: reportData,
            }),
            invalidatesTags: ['report'],
        }),
        deletedReport: builder.mutation({
            query: (id) => ({
                url: `/report/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['report'],
        }),
    })
});




export const { useCreateReportMutation, useGetAllReportsQuery, useDeletedReportMutation, useLazyGetAllReportsDownloadQuery } = reportApi;