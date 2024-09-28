import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeleteBuyerDevelopmentMutation,
  useGetAllBuyerDevelopmentQuery,
} from "../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { TBuyer } from "../../types/tableType";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const BuyerDevelopmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteBuyerDevelopment] = useDeleteBuyerDevelopmentMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteBuyerDevelopment(id);
    if (res.data.success) {
      toast.success("Buyer Development deleted successfully.");
    }
  };
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
      render: (item: TBuyer) => {
        return (
          <Space>
            <Link to={`/admin/travel_allowance/${item._id}`}>Edit</Link>
            <Button danger onClick={() => handleDeleted(item._id as string)}>
              Deleted
            </Button>
          </Space>
        );
      },
    },
  ];
  const { data, isError, isLoading } = useGetAllBuyerDevelopmentQuery({
    undefined,
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title="Buyer Development cost" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :
          <span className="text-red-500"> {data?.data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
        size="small"
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

export default BuyerDevelopmentTable;
