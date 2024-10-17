import { baseApi } from "../../api/api";


const travelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTravellings: builder.query({
            query: () => (
                { url: `/travelling-allowance`, method: 'GET' }),
            // transformResponse: (responsive: TResponseRedux<TTravel>) => {
            //     return {
            //         data: responsive.data,
            //         meta: responsive.meta,
            //         totalPrice: responsive.totalPrice
            //     };
            // }, 
            providesTags: ['Travelling'],
        }),
        getTodayTravellings: builder.query({
            query: () => (
                { url: `/travelling-allowance/today`, method: 'GET' }
            ), providesTags: ['Travelling'],
        }),
        createTravel: builder.mutation({
            query: (travellingData) => ({
                url: '/travelling-allowance',
                method: 'POST',
                body: travellingData,
            }),
            invalidatesTags: ['Travelling'],
        }),
        updateTravelling: builder.mutation({
            query: (data) => ({
                url: `/travelling-allowance/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Travelling'],
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
            invalidatesTags: ['Travelling'],
        }),
    })
});




export const { useCreateTravelMutation, useGetAllTravellingsQuery, useUpdateTravellingMutation, useDeletedTravelMutation, useSingleTravellingQuery, useGetTodayTravellingsQuery } = travelApi;