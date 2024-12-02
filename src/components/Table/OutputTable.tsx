import { Button, Space, Table } from "antd";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedOutputMutation,
  useGetAllOutputsQuery,
} from "../../redux/features/output/outputApi";
import { useAppSelector } from "../../redux/hook";
import { TOutput } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const OutputTable = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data, isLoading, isError } = useGetAllOutputsQuery(undefined);
  const [deleteReport] = useDeletedOutputMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteReport(id);
    if (res.data.success) {
      toast.success("Production Report deleted successfully.");
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Cutting Completed",
      dataIndex: "cuttingCompleted",
      key: "cuttingCompleted",
    },
    {
      title: "Sewing Output",
      dataIndex: "sewingOutput",
      key: "sewingOutput",
    },
    {
      title: "Finishing Output",
      dataIndex: "finishingOutput",
      key: "finishingOutput",
    },
    {
      title: "Packing Completed",
      dataIndex: "packingCompleted",
      key: "packingCompleted",
    },
    ...(user?.role === userRole.superAdmin || user?.role === userRole.ADMIN
      ? [
          {
            title: "Action",
            key: "action",
            render: (item: TOutput) => {
              return (
                <Space>
                  <Button
                    danger
                    onClick={() => handleDeleted(item._id as string)}
                  >
                    Delete
                  </Button>
                </Space>
              );
            },
          },
        ]
      : []),
  ];
  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <SectionTitle title="Production Reports" />
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={columns}
          dataSource={data?.data}
          rowKey="_id"
          scroll={{ y: 55 * 7 }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default OutputTable;
