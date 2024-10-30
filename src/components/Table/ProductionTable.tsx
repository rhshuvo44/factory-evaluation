import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedProductionMutation,
  useGetAllProductionQuery,
} from "../../redux/features/productionReport/productionApi";
import { useAppSelector } from "../../redux/hook";
import { productionColums } from "../../types";
import { TProductionReport } from "../../types/tableType";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";

const ProductionTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteProduction] = useDeletedProductionMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteProduction(id);
    if (res.data.success) {
      toast.success("Production report deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllProductionQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div className="responsive-table-container">
      <Table
        size="small"
        className="table-auto"
        bordered
        columns={[
          ...productionColums,
          ...(user?.role === userRole.ADMIN ||
          user?.role === userRole.Coordinator
            ? [
                {
                  title: "Action",
                  key: "action",
                  render: (item: TProductionReport) => {
                    return (
                      <Space>
                        <Link to={`/${user!.role}/production/${item._id}`}>
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
        scroll={{ y: 55 * 7 }}
      />
    </div>
  );
};

export default ProductionTable;
