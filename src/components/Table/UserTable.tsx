import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hook";
import { TUSer, UserColums } from "../../types";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [deleteUser] = useDeleteUserMutation();
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const handleDeleted = async (id: string) => {
    const res = await deleteUser(id);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };

  const { data, isError, isLoading } = useGetUserQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <Table
      className="table-auto"
      bordered
      size="small"
      columns={[
        ...UserColums,
        ...(user?.role === "admin"
          ? [
              {
                title: "Action",
                key: "action",
                render: (item: TUSer) => {
                  return (
                    <Space>
                      <Link to={`/${user!.role}/user/${item._id}`}>Edit</Link>

                      <Button
                        danger
                        onClick={() => handleDeleted(item._id as string)}
                      >
                        Delete
                      </Button>
                    </Space>
                  );
                },
              },
            ]
          : []),
      ]}
      dataSource={data?.data?.result}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        // total: data?.total,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default UserTable;
