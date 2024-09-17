import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTravellingsQuery } from "../../redux/api/api";
import Loading from "../ui/Loading";
import { TUtility } from "../../types/tableType";

const UtilityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const colums = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },

    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "WorkingDays",
      dataIndex: "workingDays",
      key: "workingDays",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Per Day Salary",
      dataIndex: "perDaySalary",
      key: "perDaySalary",
    },
    {
      title: "Over Time",
      dataIndex: "overTime",
      key: "overTime",
    },
    {
      title: "Over Time Rate",
      dataIndex: "overTimeRate",
      key: "overTimeRate",
    },
    {
      title: "Gross Per Day Salary",
      dataIndex: "grossPerDaySalary",
      key: "grossPerDaySalary",
    },

    {
      title: "Action",
      key: "action",
      render: (_: number, record: TUtility) => (
        <Button
          type="link"
          onClick={() => navigate(`/product/${record.internet}`)}
        >
          View Details
        </Button>
      ),
    },
  ];
  const { data, isError, isLoading } = useGetTravellingsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <Table
      className="table-auto"
      bordered
      columns={colums}
      //   dataSource={data}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: data?.total,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default UtilityTable;
