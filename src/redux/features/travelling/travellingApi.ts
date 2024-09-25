import { TTravel } from "../../../types/tableType";
import { baseApi } from "../../api/api";


const travelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTravellings: builder.query<{ travelling: TTravel[]; total: number }, { limit: number; skip: number }>({
            query: ({ limit, skip }) => ({ url: `/travelling-allowance`, method: 'GET' }),
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
        deletedTravel: builder.mutation<TTravel, number>({
            query: (id) => ({ url: `/travelling-allowance/${id}`, method: "DELETE" }),
        }),
    })
});




export const { useCreateTravelMutation, useGetAllTravellingsQuery, useUpdateTravellingMutation, useDeletedTravelMutation } = travelApi;