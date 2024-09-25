import { baseApi } from "../../api/api";


const loanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllTravellings: builder.query<{ travelling: TTravel[]; total: number }, { limit: number; skip: number }>({
        //     query: ({ limit, skip }) => ({ url: `/travelling-allowance?limit=${limit}&skip=${skip}`, method: 'GET' }),
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




export const { useCreateLoanMutation } = loanApi;