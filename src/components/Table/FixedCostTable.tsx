import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTravellingsQuery } from "../../redux/api/api";
import { TFixed } from "../../types/tableType";
import Loading from "../ui/Loading";

const FixedCostTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const colums = [
    {
      title: "Factory Rent",
      dataIndex: "factoryRent",
      key: "factoryRent",
    },

    {
      title: "Honorary",
      dataIndex: "honorary",
      key: "honorary",
    },
    {
      title: "Factory Revenue",
      dataIndex: "factoryRevenue",
      key: "factoryRevenue",
    },

    {
      title: "Action",
      key: "action",
      render: (_: number, record: TFixed) => (
        <Button
          type="link"
          onClick={() => navigate(`/product/${record.factoryRent}`)}
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

export default FixedCostTable;
