import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeleteMiscellaneousMutation,
  useGetAllMiscellaneousQuery,
} from "../../redux/features/Miscellaneous/MiscellaneousApi";
import { useAppSelector } from "../../redux/hook";
import { misColumns } from "../../types";
import { TMiscellaneous } from "../../types/tableType";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const MiscellaneousTableComponent = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deletedTravel] = useDeleteMiscellaneousMutation();
  const handleDeleted = async (id: string) => {
    const res = await deletedTravel(id);
    if (res.data.success) {
      toast.success("Miscellaneous deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllMiscellaneousQuery(undefined);
  // console.log(data?.data?.result);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between mb-2">
        <SectionTitle title="Miscellaneous" />
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
            ...misColumns,
            ...(user?.role === userRole.superAdmin ||
            user?.role === userRole.ADMIN ||
            user?.role === userRole.ExecutiveDirector
              ? [
                  {
                    title: "Action",
                    key: "action",
                    render: (item: TMiscellaneous) => {
                      return (
                        <Space>
                          <Link to={`/${user!.role}/misc_cost/${item._id}`}>
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
          scroll={{ y: 55 * 7 }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default MiscellaneousTableComponent;
