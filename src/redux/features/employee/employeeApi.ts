import { baseApi } from "../../api/api";

const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({ url: '/employees', method: 'GET' }), providesTags: ['Employee'],
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: '/employees',
                method: 'POST',
                body: data,
            }),
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `/employees/${data.id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeMutation } = employeeApi