import { baseApi } from "../../api/api";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => ({ url: '/notification', method: 'GET' }),
            providesTags: ['notification'],
        }),

        createNotification: builder.mutation({
            query: (data) => ({
                url: '/notification',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['notification'],
        }),
    }),
});

export const { useGetNotificationQuery, useCreateNotificationMutation } = notificationApi