import { baseApi } from "../../api/api";

const collectionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCollections: builder.query({
            query: () => ({ url: '/collection', method: 'GET' }), providesTags: ['Collection'],
        }),
        createCollection: builder.mutation({
            query: (data) => ({
                url: '/collection',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useCreateCollectionMutation, useGetAllCollectionsQuery } = collectionApi;