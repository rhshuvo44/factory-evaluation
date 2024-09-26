import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllTravellingsQuery } from "../../redux/features/travelling/travellingApi";
import { TTravel } from "../../types/tableType";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const TravellingTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const navigate = useNavigate();

  const colums = [
    {
      title: "SL",
      dataIndex: "slNo",
      key: "slNo",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "Buyer ID",
      dataIndex: "buyerId",
      key: "buyerId",
    },
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Pay To",
      dataIndex: "payTo",
      key: "payTo",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (_: number, record: TTravel) => (
        <Button type="link" onClick={() => navigate(`${record._id}`)}>
          Edit
        </Button>
      ),
    },
  ];
  const { data, isError, isLoading } = useGetAllTravellingsQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title=" Travelling Allowance" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :
          <span className="text-red-500"> {data?.data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          className="table-auto"
          bordered
          columns={colums}
          dataSource={data?.data?.result}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            // total: data?.data.meta.total,
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

export default TravellingTable;
