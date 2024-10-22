import { baseApi } from "../../api/api";


const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query({
            query: () => (
                { url: `/report`, method: 'GET' }),

            providesTags: ['report'],
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




export const { useCreateReportMutation, useGetAllReportsQuery, useDeletedReportMutation } = reportApi;