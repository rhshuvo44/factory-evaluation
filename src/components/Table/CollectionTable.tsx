import { Button, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeletedCollectionMutation,
  useGetAllCollectionsQuery,
} from "../../redux/features/collection/collectionApi";
import { useAppSelector } from "../../redux/hook";
import { TCollection } from "../../types/tableType";
import { verifyToken } from "../../utilis/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
import { collectionColums } from "../../types";

const CollectionTable = () => {
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

  const { data, isError, isLoading } = useGetAllCollectionsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title=" Collection Table" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :
          <span className="text-red-500"> {data?.totalPrice}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={[
            ...collectionColums,
            ...(user?.role === userRole.ADMIN ||
            user?.role === userRole.ExecutiveDirector
              ? [
                  {
                    title: "Action",
                    key: "action",
                    render: (item: TCollection) => {
                      return (
                        <Space>
                          <Link to={`/${user!.role}/collection/${item._id}`}>
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
          dataSource={data?.data}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.meta.total,
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

export default CollectionTable;
