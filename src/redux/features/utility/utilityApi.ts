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
    })
});




export const { useCreateUtilityMutation } = utilityApi;