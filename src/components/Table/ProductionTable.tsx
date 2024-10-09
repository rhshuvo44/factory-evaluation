import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useDeletedCollectionMutation } from "../../redux/features/collection/collectionApi";
import { useGetAllProductionQuery } from "../../redux/features/productionReport/productionApi";
import { useAppSelector } from "../../redux/hook";
import { TProductionReport } from "../../types/tableType";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";

const ProductionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteCollection] = useDeletedCollectionMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteCollection(id);
    if (res.data.success) {
      toast.success("Collection deleted successfully.");
    }
  };
  //   buyer
  //
  //   cuttingSection
  //   finishing
  //   :
  //   [{…}]
  //   lineNo
  //   orderNo
  //   orderQuantity
  //   readyQuantity
  //   remark
  //   sellingSection
  //   :
  //   [{…}]
  //   styleNo
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
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Style No",
      dataIndex: "styleNo",
      key: "styleNo",
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
    },
    {
      title: "Order No ",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Line No ",
      dataIndex: "lineNo",
      key: "lineNo",
    },
    {
      title: "Order Quantity",
      dataIndex: "orderQuantity",
      key: "orderQuantity",
    },
    {
      title: "Ready Quantity",
      dataIndex: "readyQuantity",
      key: "readyQuantity",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
    // Grouping Cutting Section
    {
      title: "Cutting Section",
      children: [
        {
          title: "Target",
          dataIndex: ["cuttingSection", 0, "target"],
          key: "cuttingTarget",
        },
        {
          title: "WIP",
          dataIndex: ["cuttingSection", 0, "wip"],
          key: "cuttingWIP",
        },
        {
          title: "Output",
          dataIndex: ["cuttingSection", 0, "output"],
          key: "cuttingOutput",
        },
      ],
    },
    // Grouping Selling Section
    {
      title: "Selling Section",
      children: [
        {
          title: "Target",
          dataIndex: ["sellingSection", 0, "target"],
          key: "sellingTarget",
        },
        {
          title: "WIP",
          dataIndex: ["sellingSection", 0, "wip"],
          key: "sellingWIP",
        },
        {
          title: "Output",
          dataIndex: ["sellingSection", 0, "output"],
          key: "sellingOutput",
        },
      ],
    },
    // Grouping Finishing Section
    {
      title: "Finishing Section",
      children: [
        {
          title: "Target",
          dataIndex: ["finishing", 0, "target"],
          key: "finishingTarget",
        },
        {
          title: "WIP",
          dataIndex: ["finishing", 0, "wip"],
          key: "finishingWIP",
        },
        {
          title: "Output",
          dataIndex: ["finishing", 0, "output"],
          key: "finishingOutput",
        },
      ],
    },
    ...(user?.role === userRole.ADMIN || user?.role === userRole.Coordinator
      ? [
          {
            title: "Action",
            key: "action",
            render: (item: TProductionReport) => {
              return (
                <Space>
                  <Link to={`/${user!.role}/collection/${item._id}`}>Edit</Link>
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
  const { data, isError, isLoading } = useGetAllProductionQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div className="responsive-table-container">
      <Table
        scroll={{ x: 1500 }}
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
  );
};

export default ProductionTable;
