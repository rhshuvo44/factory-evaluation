import { baseApi } from "../../api/api";

const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({ url: '/employee', method: 'GET' }), providesTags: ['Employee'],
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: '/employee',
                method: 'POST',
                body: data,
            }),
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `/employee/${data.id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeMutation } = employeeApi