import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedTravelMutation,
  useGetAllTravellingsQuery,
} from "../../redux/features/travelling/travellingApi";
import { useAppSelector } from "../../redux/hook";
import { travellingColums } from "../../types";
import { TTravel } from "../../types/tableType";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const TravellingTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deletedTravel] = useDeletedTravelMutation();
  const handleDeleted = async (id: string) => {
    const res = await deletedTravel(id);
    if (res.data.success) {
      toast.success("Travelling Allowance deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllTravellingsQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div> {toast.error(isError)}</div>;

  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title="Travelling Allowance" />
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
            ...(user?.role === userRole.ADMIN ||
            user?.role === userRole.ExecutiveDirector
              ? [
                  {
                    title: "Action",
                    key: "action",
                    render: (item: TTravel) => {
                      return (
                        <Space>
                          <Link
                            to={`/${user!.role}/travel_allowance/${item._id}`}
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
          scroll={{ y: 500 }}
          tableLayout="auto"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default TravellingTable;
