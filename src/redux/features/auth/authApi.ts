import { baseApi } from "../../api/api";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
        }),
        changePassword: builder.mutation({
            query: (password) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: password,
            }),
        }),
    }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;