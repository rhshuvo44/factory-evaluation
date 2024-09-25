import { baseApi } from "../../api/api";


const loanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllLoan: builder.query<{ travelling: TTravel[]; total: number }, { limit: number; skip: number }>({
        //     query: ({ limit, skip }) => ({ url: `/loan?limit=${limit}&skip=${skip}`, method: 'GET' }),
        // }),
        createLoan: builder.mutation({
            query: (data) => ({
                url: '/loan',
                method: 'POST',
                body: data,
            }),
        }),

    })
});




export const { useCreateLoanMutation, useGetAllLoanQuery } = loanApi;