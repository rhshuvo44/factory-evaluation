import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TUSer } from "../../types/tableType";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const colums = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_: number, record: TUSer) => (
        <Button type="link" onClick={() => navigate(`/user/${record.email}`)}>
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

export default UserTable;
