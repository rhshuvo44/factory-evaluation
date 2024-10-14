import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedProductionMutation,
  useGetAllProductionQuery,
} from "../../redux/features/productionReport/productionApi";
import { useAppSelector } from "../../redux/hook";
import { productionColums } from "../../types";
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
  const [deleteProduction] = useDeletedProductionMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteProduction(id);
    if (res.data.success) {
      toast.success("Collection deleted successfully.");
    }
  };

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
        columns={[
          ...productionColums,
          ...(user?.role === userRole.ADMIN ||
          user?.role === userRole.Coordinator
            ? [
                {
                  title: "Action",
                  key: "action",
                  render: (item: TProductionReport) => {
                    return (
                      <Space>
                        <Link to={`/${user!.role}/production/${item._id}`}>
                          Edit
                        </Link>
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
        ]}
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
