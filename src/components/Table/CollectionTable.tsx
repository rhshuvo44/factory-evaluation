// slNo: number;
// date: Date;
// time: string;
// style: string;
// total: number;
// challan: string;
// chalanNo: number;
// ratePer: string;
// amount: number;

import { Button, Table } from "antd";
import { TCollection } from "../../types/tableType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CollectionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const colums = [
    {
      title: "SL No",
      dataIndex: "SL No",
      key: "SL No",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Challan ",
      dataIndex: "challan",
      key: "challan",
    },
    {
      title: "Challan NO",
      dataIndex: "challanNo",
      key: "challanNo",
    },
    {
      title: "Rate Per",
      dataIndex: "ratePer",
      key: "ratePer",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (_: number, record: TCollection) => (
        <Button type="link" onClick={() => navigate(`/product/${record.slNo}`)}>
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
        //   total: data?.total,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default CollectionTable;
