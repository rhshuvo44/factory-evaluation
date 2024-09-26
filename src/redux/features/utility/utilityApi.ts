import { baseApi } from "../../api/api";


const utilityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createUtility: builder.mutation({
            query: (data) => ({
                url: '/utility',
                method: 'POST',
                body: data,
            }),
        }),
        getAllUtility: builder.query({
            query: () => (
                { url: `/utility`, method: 'GET' }
            ), providesTags: ['Utility'],
        })
    })
});




export const { useCreateUtilityMutation, useGetAllUtilityQuery } = utilityApi;