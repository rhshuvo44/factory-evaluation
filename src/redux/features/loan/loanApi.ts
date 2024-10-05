import { baseApi } from "../../api/api";

const loanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLoans: builder.query({
            query: () => ({ url: '/loan-return', method: 'GET' }),
            providesTags: ['Loan'],
        }),
        getTodayLoan: builder.query({
            query: () => (
                { url: `/loan-return/today`, method: 'GET' }
            ), providesTags: ['Loan'],
        }),
        createLoan: builder.mutation({
            query: (data) => ({
                url: '/loan-return',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Loan'],
        }),
        singleLoan: builder.query({
            query: (id) => ({
                url: `/loan-return/${id}`,
                method: 'GET',
            }),
        }),
        updateLoan: builder.mutation({
            query: (data) => ({
                url: `/loan-return/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Loan'],
        }),
        deleteLoan: builder.mutation({
            query: (id) => ({
                url: `/loan-return/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Loan'],
        }),
    }),
});
export const { useGetAllLoansQuery, useCreateLoanMutation, useDeleteLoanMutation, useSingleLoanQuery, useUpdateLoanMutation, useGetTodayLoanQuery } = loanApi