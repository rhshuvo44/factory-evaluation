import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedFactoryMutation,
  useGetAllFactoryDevelopsQuery,
} from "../../redux/features/Factory development/factoryDevelopmentApi";
import { useAppSelector } from "../../redux/hook";
import { factoryColums } from "../../types";
import { TFactory } from "../../types/tableType";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const FactoryDevelopmentTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deletedFactory] = useDeletedFactoryMutation();
  const handleDeleted = async (id: string) => {
    const res = await deletedFactory(id);
    if (res.data.success) {
      toast("Factory Development deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllFactoryDevelopsQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between mb-2">
        <SectionTitle title="Factory Development cost" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :<span className="text-red-500"> {data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={[
            ...factoryColums,
            ...(user?.role === userRole.superAdmin ||
            user?.role === userRole.ADMIN ||
            user?.role === userRole.ExecutiveDirector
              ? [
                  {
                    title: "Action",
                    key: "action",
                    render: (item: TFactory) => {
                      return (
                        <Space>
                          <Link
                            to={`/${user!.role}/factory_development/${
                              item._id
                            }`}
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
          rowKey="_id"
          // scroll={{ y: 55 * 7 }}
          // pagination={false}
        />
      </div>
    </div>
  );
};

export default FactoryDevelopmentTable;
