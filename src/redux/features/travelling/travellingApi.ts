import { TTravel } from "../../../types/tableType";
import { baseApi } from "../../api/api";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTravellings: builder.query<{ travelling: TTravel[]; total: number }, { limit: number; skip: number }>({
            query: ({ limit, skip }) => ({ url: `travelling-allowance?limit=${limit}&skip=${skip}`, method: 'GET' }),
        }),
        getATravel: builder.query<TTravel, number>({
            query: (id) => ({ url: `travelling-allowance/${id}`, method: "GET" }),
        }),
        updateTravelling: builder.mutation<TTravel, { id: number; data: Partial<TTravel> }>({
            query: ({ id, data }) => ({
                url: `travelling-allowance/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deletedTravel: builder.mutation<TTravel, number>({
            query: (id) => ({ url: `travelling-allowance/${id}`, method: "GET" }),
        }),
    })
});




export const { useGetATravelQuery, useGetAllTravellingsQuery, useUpdateTravellingMutation } = authApi;