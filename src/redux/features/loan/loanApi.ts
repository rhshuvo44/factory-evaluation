import { baseApi } from "../../api/api";

const loanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLoans: builder.query({
            query: () => ({ url: '/loan-return', method: 'GET' }),
            providesTags: ['Loan'],
        }),
        createLoan: builder.mutation({
            query: (data) => ({
                url: '/loan-return',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
export const { useGetAllLoansQuery, useCreateLoanMutation } = loanApi