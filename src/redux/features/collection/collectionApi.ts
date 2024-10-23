import { baseApi } from "../../api/api";

const collectionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCollections: builder.query({
            query: () => ({ url: '/collection', method: 'GET' }), providesTags: ['Collection'],
        }),
        getTodayCollections: builder.query({
            query: (queryParams) => ({ url: `/collection/today?date=${queryParams}`, method: 'GET' }), providesTags: ['Collection'],
        }),
        updateCollection: builder.mutation({
            query: (data) => ({
                url: `/collection/${data.id}`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Collection'],
        }),
        singleCollection: builder.query({
            query: (id) => ({
                url: `/collection/${id}`,
                method: 'GET',
            }),
        }),
        createCollection: builder.mutation({
            query: (data) => ({
                url: '/collection',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Collection'],
        }),
        deletedCollection: builder.mutation({
            query: (id) => ({
                url: `/collection/${id}`, method: "DELETE"
            }),
            invalidatesTags: ['Collection'],
        }),
    }),
});

export const { useCreateCollectionMutation, useGetAllCollectionsQuery, useDeletedCollectionMutation, useSingleCollectionQuery, useUpdateCollectionMutation, useGetTodayCollectionsQuery } = collectionApi;