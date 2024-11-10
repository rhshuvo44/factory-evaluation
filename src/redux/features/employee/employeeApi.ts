import { baseApi } from "../../api/api";

const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({ url: '/employee', method: 'GET' }), providesTags: ['Employee'],
        }),
        getTodayEmployees: builder.query({
            query: (queryParams) => ({ url: `/employee/today?date=${queryParams.date}`, method: 'GET' }), providesTags: ['Employee'],
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
            query: ({ id, formData }) => {
            
                return {
                    url: `/employee/${id}`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: ['Employee'],
        }),
        singleEmployee: builder.query({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'GET',
            }),
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
export const { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeMutation, useGetTodayEmployeesQuery, useSingleEmployeeQuery } = employeeApi