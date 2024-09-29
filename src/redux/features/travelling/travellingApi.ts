import { baseApi } from "../../api/api";


const travelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTravellings: builder.query({
            query: () => (
                { url: `/travelling-allowance`, method: 'GET' }
            ), providesTags: ['Travelling'],
        }),
        createTravel: builder.mutation({
            query: (travellingData) => ({
                url: '/travelling-allowance',
                method: 'POST',
                body: travellingData,
            }),
        }),
        updateTravelling: builder.mutation({
            query: (data) => ({
                url: `/travelling-allowance/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
        }),
        singleTravelling: builder.query({
            query: (id) => ({
                url: `/travelling-allowance/${id}`,
                method: 'GET',
            }),
        }),
        deletedTravel: builder.mutation({
            query: (id) => ({
                url: `/travelling-allowance/${id}`, method: "DELETE"
            }),
        }),
    })
});




export const { useCreateTravelMutation, useGetAllTravellingsQuery, useUpdateTravellingMutation, useDeletedTravelMutation, useSingleTravellingQuery } = travelApi;