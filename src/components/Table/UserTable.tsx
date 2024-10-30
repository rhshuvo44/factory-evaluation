import { Button, Space, Table } from "antd";
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
                      {user!.userId !== item._id && (
                        <>
                          <Link to={`/${user!.role}/user/${item._id}`}>
                            Edit
                          </Link>
                          <Button
                            danger
                            onClick={() => handleDeleted(item._id as string)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Space>
                  );
                },
              },
            ]
          : []),
      ]}
      dataSource={data?.data}
      rowKey="_id"
      pagination={false}
    />
  );
};

export default UserTable;
