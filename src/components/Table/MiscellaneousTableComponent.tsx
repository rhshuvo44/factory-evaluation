import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TTravel } from "../../types/tableType";

const MiscellaneousTableComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  //   const { data, isError, isLoading } = useGetProductsQuery({
  //     limit: pageSize,
  //     skip: (currentPage - 1) * pageSize,
  //   });
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_: number, record: TTravel) => (
        <Button type="link" onClick={() => navigate(`/product/${record.slNo}`)}>
          View Details
        </Button>
      ),
    },
  ];

  //   if (isLoading) return <Loading />;
  //   if (isError) return <div>Error: {isError}</div>;
  return (
    <Table
      className="table-auto"
      bordered
      columns={columns}
      //   dataSource={data?.travelling}
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

export default MiscellaneousTableComponent;
