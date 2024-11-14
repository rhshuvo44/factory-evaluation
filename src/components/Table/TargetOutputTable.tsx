import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedTargetOutputMutation,
  useGetAllTargetOutputQuery,
} from "../../redux/features/targetOutput/targetOutputApi";
import { useAppSelector } from "../../redux/hook";
import { targetOutputColums, TTargetReport } from "../../types";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";

const TargetOutputTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteTargetOutput] = useDeletedTargetOutputMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteTargetOutput(id);
    if (res.data.success) {
      toast.success("Target report deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllTargetOutputQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div className="responsive-table-container">
      <Table
        scroll={{ x: 1500}}
        size="small"
        className="table-auto"
        bordered
        columns={[
          ...targetOutputColums,
          ...(user?.role === userRole.superAdmin ||user?.role === userRole.ADMIN ||
          user?.role === userRole.Coordinator
            ? [
                {
                  title: "Action",
                  key: "action",
                  render: (item: TTargetReport) => {
                    return (
                      <Space>
                        <Link to={`/${user!.role}/target/${item._id}`}>
                          Edit
                        </Link>
                        <Button
                          danger
                          onClick={() => handleDeleted(item._id as string)}
                        >
                          Delete
                        </Button>
                        {/* Conditionally render "Edit" if quantities match */}
                        {item.readyQuantity === item.orderQuantity ? (
                          <Button type="primary">Finished</Button>
                        ) : (
                          <Button>Running</Button>
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
        // pagination={false}
      />
    </div>
  );
};

export default TargetOutputTable;
