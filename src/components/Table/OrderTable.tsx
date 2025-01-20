import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";

import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "../../redux/features/order/orderApi";
import { useAppSelector } from "../../redux/hook";
import { orderColums } from "../../types";
import { TBuyer } from "../../types/tableType";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const OrderTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteOrder] = useDeleteOrderMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteOrder(id);
    if (res.data.success) {
      toast.success("Order deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllOrderQuery({
    undefined,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <SectionTitle title="Order List" />

      <div className="responsive-table-container mt-2">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={[
            ...orderColums,
            ...(user?.role === userRole.superAdmin ||
            user?.role === userRole.ADMIN ||
            user?.role === userRole.ExecutiveDirector
              ? [
                  {
                    title: "Action",
                    key: "action",
                    render: (item: TBuyer) => {
                      return (
                        <Space>
                          <Link to={`/${user!.role}/order/${item.orderNo}`}>
                            Edit
                          </Link>
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
          ]}
          dataSource={data?.data}
          rowKey="_id"
          // scroll={{ y: 55 * 7 }}
          // pagination={false}
        />
      </div>
    </div>
  );
};

export default OrderTable;
