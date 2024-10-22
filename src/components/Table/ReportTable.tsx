import { Button, Space, Table } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedReportMutation,
  useGetAllReportsQuery,
} from "../../redux/features/report/reportApi";
import { useAppSelector } from "../../redux/hook";
import { TReport } from "../../types";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const ReportTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data, isLoading, isError } = useGetAllReportsQuery(undefined);
  const [deleteReport] = useDeletedReportMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteReport(id);
    if (res.data.success) {
      toast.success(" Report deleted successfully.");
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;
  const columns = [
    {
      title: "SlNo",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Factory Running Cost",
      dataIndex: "factoryRunningCost",
      key: "factoryRunningCost",
    },
    {
      title: "Factory Collection",
      dataIndex: "factoryCollection",
      key: "factoryCollection",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) => (
        <span
          style={{
            color:
              value < 0
                ? "rgb(240, 0, 0)"
                : value > 0
                ? "rgb(0, 240, 0)"
                : "inherit",
          }}
        >
          {value}
        </span>
      ),
    },
    ...(user?.role === userRole.ADMIN
      ? [
          {
            title: "Action",
            key: "action",
            render: (item: TReport) => {
              return (
                <Space>
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
  ];
  return (
    <div>
      <div className="flex  items-center justify-between my-2">
        <SectionTitle title="Reports" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total Balance :
          <span className="text-red-500"> {data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={columns}
          dataSource={data?.data}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.meta?.total,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default ReportTable;
