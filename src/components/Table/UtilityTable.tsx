import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TUtility } from "../../types/tableType";

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
  // const { data, isError, isLoading } = useGetTravellingsQuery({
  //   limit: pageSize,
  //   skip: (currentPage - 1) * pageSize,
  // });

  // if (isLoading) return <Loading />;
  // if (isError) return <div>Error: {isError}</div>;
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
