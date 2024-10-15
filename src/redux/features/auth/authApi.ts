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
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: email,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useChangePasswordMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi;