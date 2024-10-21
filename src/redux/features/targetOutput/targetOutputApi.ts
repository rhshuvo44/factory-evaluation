import { baseApi } from "../../api/api";


const targetOutputApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTargetOutput: builder.query({
            query: () => (
                { url: `/targets-output`, method: 'GET' }
            ), providesTags: ['targetOutput'],
        }),
        createTargetOutput: builder.mutation({
            query: (data) => ({
                url: '/targets-output',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['targetOutput'],
        }),
        updateTargetOutput: builder.mutation({
            query: (data) => ({
                url: `/targets-output/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['targetOutput'],
        }),
        singleTargetOutput: builder.query({
            query: (id) => ({
                url: `/targets-output/${id}`,
                method: 'GET',
            }),
        }),
        deletedTargetOutput: builder.mutation({
            query: (id) => ({
                url: `/targets-output/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['targetOutput'],
        }),
    })
});




export const { useCreateTargetOutputMutation, useDeletedTargetOutputMutation, useGetAllTargetOutputQuery, useSingleTargetOutputQuery, useUpdateTargetOutputMutation } = targetOutputApi;