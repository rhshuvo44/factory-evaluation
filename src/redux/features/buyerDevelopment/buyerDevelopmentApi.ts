import { baseApi } from "../../api/api";


const buyerDevelopmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createBuyerDevelopment: builder.mutation({
            query: (travellingData) => ({
                url: '/buyer-development',
                method: 'POST',
                body: travellingData,
            }),
        }),


    })
});




export const { useCreateBuyerDevelopmentMutation } = buyerDevelopmentApi;