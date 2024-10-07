import { baseApi } from "../../api/api";

const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({ url: '/employee', method: 'GET' }), providesTags: ['Employee'],
        }),
        getTodayEmployees: builder.query({
            query: () => ({ url: '/employee/today', method: 'GET' }), providesTags: ['Employee'],
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: '/employee',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `/employee/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),
    }),
})
export const { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeMutation, useGetTodayEmployeesQuery } = employeeApi