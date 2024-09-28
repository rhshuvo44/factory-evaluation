import { TTravel } from "../../../types/tableType";
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
        updateTravelling: builder.mutation<TTravel, { id: number; data: Partial<TTravel> }>({
            query: ({ id, data }) => ({
                url: `/travelling-allowance/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deletedTravel: builder.mutation({
            query: (id) => (
                {
                    url: `/travelling-allowance/${id}`, method: "DELETE" 
                    
                   
                }),
        }),
    })
});




export const { useCreateTravelMutation, useGetAllTravellingsQuery, useUpdateTravellingMutation, useDeletedTravelMutation } = travelApi;