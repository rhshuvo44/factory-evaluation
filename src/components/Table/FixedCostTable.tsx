import { Button, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedFixedCostMutation,
  useGetAllFixedCostQuery,
} from "../../redux/features/fixedCost/fixedCostApi";
import { useAppSelector } from "../../redux/hook";
import { TFixed } from "../../types";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const FixedCostTable = () => {
  const [deleteUtility] = useDeletedFixedCostMutation();
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const handleDeleted = async (id: string) => {
    const res = await deleteUtility(id);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };
  const { data, isError, isLoading } = useGetAllFixedCostQuery(undefined);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title="Fixed Cost Table" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :
          <span className="text-red-500"> {data?.data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table<TFixed>
          size="small"
          pagination={false}
          dataSource={data?.data?.result.map((item: TFixed) => ({
            ...item,
            key: item._id,
          }))}
        >
          <Column
            title="SL"
            key="slNo"
            render={(_, record) => record.slNo || "N/A"}
          />
          <ColumnGroup title="Factory Rent">
            <Column
              title="Unit Price"
              render={(_, record) => record.factoryRent[0]?.unitPrice || "N/A"}
              key="unitPrice"
            />
            <Column
              title="Total Price"
              render={(_, record) => record.factoryRent[0]?.totalPrice || "N/A"}
              key="totalPrice"
            />
          </ColumnGroup>

          <ColumnGroup title="Factory Revenue">
            <Column
              title="Unit Price"
              key="factoryRevenueUnitPrice"
              render={(_, record) =>
                record.factoryRevenue[0]?.unitPrice || "N/A"
              }
            />
            <Column
              title="Total Price"
              key="factoryRevenueTotalPrice"
              render={(_, record) =>
                record.factoryRevenue[0]?.totalPrice || "N/A"
              }
            />
          </ColumnGroup>

          <ColumnGroup title="Honorary">
            <Column
              title="Unit Price"
              key="honoraryUnitPrice"
              render={(_, record) => record.honorary[0]?.unitPrice || "N/A"}
            />
            <Column
              title="Total Price"
              key="honoraryTotalPrice"
              render={(_, record) => record.honorary[0]?.totalPrice || "N/A"}
            />
          </ColumnGroup>
          {user?.role === "admin" && (
            <Column
              title="Action"
              key="action"
              render={(item: TFixed) => (
                <Space>
                  <Link to={`/${user!.role}/fixed-cost/${item._id}`}>Edit</Link>
                  <Button
                    danger
                    onClick={() => handleDeleted(item._id as string)}
                  >
                    Delete
                  </Button>
                </Space>
              )}
            />
          )}
        </Table>
      </div>
    </div>
  );
};

export default FixedCostTable;
