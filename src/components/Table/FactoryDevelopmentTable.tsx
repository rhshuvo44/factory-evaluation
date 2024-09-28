import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeletedFactoryMutation,
  useGetAllFactoryDevelopsQuery,
} from "../../redux/features/Factory development/factoryDevelopmentApi";
import { TFactory } from "../../types/tableType";
import Loading from "../ui/Loading";

const FactoryDevelopmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deletedFactory] = useDeletedFactoryMutation();
  const handleDeleted = async (id: string) => {
    const res = await deletedFactory(id);
    if (res.data.success) {
      toast("Factory Development deleted successfully.");
    }
  };
  const colums = [
    {
      title: "SL No",
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
      title: "Memo NO",
      dataIndex: "memoNo",
      key: "memoNo",
    },
    {
      title: "Ordered By",
      dataIndex: "orderedBy",
      key: "orderedBy",
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
      render: (item: TFactory) => {
        return (
          <Space>
            <Link type="link" to={`/admin/travel_allowance/${item._id}`}>Edit</Link>
            <Button danger onClick={() => handleDeleted(item._id as string)}>
              Deleted
            </Button>
          </Space>
        );
      },
    },
  ];
  const { data, isError, isLoading } = useGetAllFactoryDevelopsQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <Table
      className="table-auto"
      bordered
      columns={colums}
      dataSource={data?.data?.result}
      rowKey="id"
      size="small"
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

export default FactoryDevelopmentTable;
