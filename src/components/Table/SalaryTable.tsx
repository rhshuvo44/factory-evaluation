import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../redux/features/employee/employeeApi";
import { useAppSelector } from "../../redux/hook";
import { TSalary } from "../../types";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const SalaryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteEmployee(id);
    if (res.data.success) {
      toast.success("Employee deleted successfully.");
    }
  };
  const colums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (_: any, record: { key: string; photo: string }) => (
        <img
          src={record.photo}
          alt="Employee Photo"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover", 
            borderRadius: "5px", 
            border: "1px solid #ddd",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Per Day Salary",
      dataIndex: "perDaySalary",
      key: "perDaySalary",
    },
    {
      title: "Over Time Rate",
      dataIndex: "overTimeRate",
      key: "overTimeRate",
    },
    {
      title: "overTime",
      dataIndex: "overTime",
      key: "overTime",
    },
    {
      title: "Gross Per Day Salary",
      dataIndex: "grossPerDaySalary",
      key: "grossPerDaySalary",
    },

    ...(user?.role === userRole.ADMIN ||
    user?.role === userRole.ExecutiveDirector
      ? [
          {
            title: "Action",
            key: "action",
            render: (item: TSalary) => {
              return (
                <Space>
                  <Link to={`/${user!.role}/employee/${item._id}`}>Edit</Link>
                  {user!.role === "admin" && (
                    <Button
                      danger
                      onClick={() => handleDeleted(item._id as string)}
                    >
                      Delete
                    </Button>
                  )}
                </Space>
              );
            },
          },
        ]
      : []),
  ];
  const { data, isError, isLoading } = useGetAllEmployeesQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title=" Employee Sheet" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :<span className="text-red-500"> {data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={colums}
          dataSource={data?.data}
          rowKey="_id"
          pagination={{
            current: currentPage,
            total: data?.meta?.total,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalaryTable;
