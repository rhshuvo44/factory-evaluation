import { baseApi } from "../../api/api";


const utilityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUtility: builder.mutation({
            query: (data) => ({
                url: '/utility',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Utility'],
        }),
        getAllUtility: builder.query({
            query: () => (
                { url: `/utility`, method: 'GET' }
            ), providesTags: ['Utility'],
        }),
        updateUtility: builder.mutation({
            query: (data) => ({
                url: `/utility/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Utility'],
        }),
        singleUtility: builder.query({
            query: (id) => ({
                url: `/utility/${id}`,
                method: 'GET',
            }),
        }),
        deletedUtility: builder.mutation({
            query: (id) => ({
                url: `/utility/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['Utility'],
        }),
    })
});




export const { useCreateUtilityMutation, useGetAllUtilityQuery, useSingleUtilityQuery, useUpdateUtilityMutation, useDeletedUtilityMutation } = utilityApi;