import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUtilityQuery } from "../../redux/features/utility/utilityApi";
import { TUtility } from "../../types/tableType";
import Loading from "../ui/Loading";

const UtilityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const colums = [
    {
      title: "Internet",
      dataIndex: "internet",
      key: "internet",
    },
    {
      title: "Water",
      dataIndex: "water",
      key: "water",
    },
    {
      title: "Electricity",
      dataIndex: "electricity",
      key: "electricity",
    },
    {
      title: "Others",
      dataIndex: "others",
      key: "others",
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
  const { data, isError, isLoading } = useGetAllUtilityQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  console.log(data.data.result);
  return (
    <Table
      className="table-auto"
      bordered
      size="small"
      columns={colums}
      // dataSource={data.data.result}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        // total: data?.total,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default UtilityTable;
