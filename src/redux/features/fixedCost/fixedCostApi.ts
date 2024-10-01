import { baseApi } from "../../api/api";


const fixedCostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFixedCost: builder.mutation({
            query: (data) => ({
                url: '/fixed-cost',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['fixedCost'],
        }),
        getAllFixedCost: builder.query({
            query: () => (
                { url: `/fixed-cost`, method: 'GET' }
            ), providesTags: ['fixedCost'],
        }),
        updateFixedCost: builder.mutation({
            query: (data) => ({
                url: `/fixed-cost/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['fixedCost'],
        }),
        singleFixedCost: builder.query({
            query: (id) => ({
                url: `/fixed-cost/${id}`,
                method: 'GET',
            }),
        }),
        deletedFixedCost: builder.mutation({
            query: (id) => ({
                url: `/fixed-cost/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['fixedCost'],
        }),
    })
});




export const { useCreateFixedCostMutation, useGetAllFixedCostQuery, useSingleFixedCostQuery, useUpdateFixedCostMutation, useDeletedFixedCostMutation } = fixedCostApi;