import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRole } from "../../constants/userRole";
import { useGetAllCollectionsQuery } from "../../redux/features/collection/collectionApi";
import { TCollection } from "../../types/tableType";
import Loading from "../ui/Loading";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utilis/verifyToken";

const CollectionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  // const [deleteBuyerDevelopment] = useDeleteBuyerDevelopmentMutation();
  // const handleDeleted = async (id: string) => {
  //   const res = await deleteBuyerDevelopment(id);
  //   if (res.data.success) {
  //     toast.success("Buyer Development deleted successfully.");
  //   }
  // };

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
      title: "Work Order No ",
      dataIndex: "workOrderNo",
      key: "workOrderNo",
    },
    {
      title: "Line No ",
      dataIndex: "lineNo",
      key: "lineNo",
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

    ...(user?.role === userRole.ADMIN ||
    user?.role === userRole.ExecutiveDirector
      ? [
          {
            title: "Action",
            key: "action",
            render: (item: TCollection) => {
              return (
                <Space>
                  <Link to={`/${user!.role}/travel_allowance/${item._id}`}>
                    Edit
                  </Link>
                  {user!.role === "admin" && (
                    <Button
                      danger
                      // onClick={() => handleDeleted(item._id as string)}
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
  const { data, isError, isLoading } = useGetAllCollectionsQuery({
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
      dataSource={data?.data?.result}
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
