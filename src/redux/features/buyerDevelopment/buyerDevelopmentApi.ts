import { baseApi } from "../../api/api";


const buyerDevelopmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllBuyerDevelopment: builder.query({
            query: () => ({
                url: '/buyer-development',
                method: 'GET',
            }),
            providesTags: ['Buyer Development'],
        }),
        createBuyerDevelopment: builder.mutation({
            query: (travellingData) => ({
                url: '/buyer-development',
                method: 'POST',
                body: travellingData,
            }),
        }),
        deleteBuyerDevelopment: builder.mutation({
            query: (id) => ({
                url: `/buyer-development/${id}`,
                method: 'DELETE',

            }),
        }),


    })
});




export const { useCreateBuyerDevelopmentMutation, useGetAllBuyerDevelopmentQuery, useDeleteBuyerDevelopmentMutation } = buyerDevelopmentApi;