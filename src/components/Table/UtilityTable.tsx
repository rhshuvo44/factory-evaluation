import { Button, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedUtilityMutation,
  useGetAllUtilityQuery,
} from "../../redux/features/utility/utilityApi";
import { useAppSelector } from "../../redux/hook";
import { TUtility } from "../../types/tableType";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
import { userRole } from "../../constants/userRole";

const UtilityTable = () => {
  const [deleteUtility] = useDeletedUtilityMutation();
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
  const { data, isError, isLoading } = useGetAllUtilityQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between mb-2">
        <SectionTitle title="Utility Table" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :
          <span className="text-red-500"> {data?.data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table<TUtility>
          size="small"
          bordered
          dataSource={data?.data?.result.map((item: TUtility) => ({
            ...item,
            key: item._id,
          }))}
          pagination={false}
        >
          <Column
            title="SL"
            key="slNo"
            render={(_, record) => record.slNo || "N/A"}
          />
          <ColumnGroup title="Electricity">
            <Column
              title="Unit Price"
              render={(_, record) => record.electricity[0]?.unitPrice || "N/A"}
              key="unitPrice"
            />
            <Column
              title="Total Price"
              render={(_, record) => record.electricity[0]?.totalPrice || "N/A"}
              key="totalPrice"
            />
          </ColumnGroup>

          <ColumnGroup title="Internet">
            <Column
              title="Unit Price"
              key="internetUnitPrice"
              render={(_, record) => record.internet[0]?.unitPrice || "N/A"}
            />
            <Column
              title="Total Price"
              key="internetTotalPrice"
              render={(_, record) => record.internet[0]?.totalPrice || "N/A"}
            />
          </ColumnGroup>

          <ColumnGroup title="Water">
            <Column
              title="Unit Price"
              key="waterUnitPrice"
              render={(_, record) => record.water[0]?.unitPrice || "N/A"}
            />
            <Column
              title="Total Price"
              key="waterTotalPrice"
              render={(_, record) => record.water[0]?.totalPrice || "N/A"}
            />
          </ColumnGroup>
          <ColumnGroup title="Other">
            <Column
              title="Unit Price"
              key="otherUnitPrice"
              render={(_, record) => record.others[0]?.unitPrice || "N/A"}
            />
            <Column
              title="Total Price"
              key="otherTotalPrice"
              render={(_, record) => record.others[0]?.totalPrice || "N/A"}
            />
          </ColumnGroup>

          {user?.role === userRole.superAdmin || user?.role === "admin" ? (
            <Column
              title="Action"
              key="action"
              render={(item: TUtility) => (
                <Space>
                  <Link to={`/${user!.role}/utility/${item._id}`}>Edit</Link>
                  <Button
                    danger
                    onClick={() => handleDeleted(item._id as string)}
                  >
                    Delete
                  </Button>
                </Space>
              )}
            />
          ) : (
            []
          )}
        </Table>
      </div>
    </>
  );
};

export default UtilityTable;
