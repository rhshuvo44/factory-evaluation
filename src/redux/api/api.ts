import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTravel } from "../../types/tableType";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getTravellings: builder.query<{ travelling: TTravel[]; total: number }, { limit: number; skip: number }>({
            query: ({ limit, skip }) => ({ url: `products?limit=${limit}&skip=${skip}`, method: 'GET' }),
        }),
        getTravel: builder.query<TTravel, number>({
            query: (id) => ({ url: `products/${id}`, method: "GET" }),
        }),
        updateTravelling: builder.mutation<TTravel, { id: number; data: Partial<TTravel> }>({
            query: ({ id, data }) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: data,
            }),
        })
    }),
})

export const { useGetTravelQuery, useGetTravellingsQuery, useUpdateTravellingMutation } = baseApi