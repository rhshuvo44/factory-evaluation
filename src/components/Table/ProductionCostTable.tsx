import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";

import {
  useDeletedProductionCostMutation,
  useGetAllProductionCostsQuery,
} from "../../redux/features/productionCost/productionCostApi";
import { useAppSelector } from "../../redux/hook";
import { travellingColums } from "../../types";
import { TTravel } from "../../types/tableType";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const ProductionCostTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deletedProductionCost] = useDeletedProductionCostMutation();
  const handleDeleted = async (id: string) => {
    const res = await deletedProductionCost(id);
    if (res.data.success) {
      toast.success(" Production Cost deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllProductionCostsQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div> {toast.error(isError)}</div>;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between mb-2">
        <SectionTitle title="Production Cost" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :<span className="text-red-500"> {data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          className="table-auto"
          bordered
          size="small"
          columns={[
            ...travellingColums,
            ...(user?.role === userRole.superAdmin ||
            user?.role === userRole.ADMIN ||
            user?.role === userRole.ExecutiveDirector
              ? [
                  {
                    title: "Action",
                    key: "action",
                    render: (item: TTravel) => {
                      return (
                        <Space>
                          <Link
                            to={`/${user!.role}/production_cost/${item._id}`}
                          >
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
          rowKey="slNo"
          // tableLayout="auto"
          // scroll={{ y: 500 }}
          scroll={{ y: 55 * 7 }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ProductionCostTable;
