import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Image, Input, Modal, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../redux/features/employee/employeeApi";
import { useAppSelector } from "../../redux/hook";
import { TSalary } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
type DataIndex = keyof TSalary;
const SalaryTable = () => {
  const token = useAppSelector(useCurrentToken);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TSalary> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            onClick={() => {
              if (clearFilters) {
                handleReset(clearFilters);
              }
              setSelectedKeys([]);
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              if (clearFilters) {
                handleReset(clearFilters);
              }
              setSelectedKeys([]);
              confirm();
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) ?? false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteEmployee(id);
    if (res.data.success) {
      toast.success("Employee deleted successfully.");
    }
  };
  const colums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (_: any, record: TSalary) => (
        <Image
          src={record?.photo}
          alt="Employee Photo"
          onClick={() => {
            setPreviewImage(record.photo);
            setPreviewOpen(true); // Open the modal when image is clicked
          }}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Per Day Salary",
      dataIndex: "perDaySalary",
      key: "perDaySalary",
    },
    {
      title: "Over Time Rate",
      dataIndex: "overTimeRate",
      key: "overTimeRate",
    },
    {
      title: "overTime",
      dataIndex: "overTime",
      key: "overTime",
    },
    {
      title: "Gross Per Day Salary",
      dataIndex: "grossPerDaySalary",
      key: "grossPerDaySalary",
    },

    ...(user?.role === userRole.superAdmin ||
    user?.role === userRole.ADMIN ||
    user?.role === userRole.ExecutiveDirector
      ? [
          {
            title: "Action",
            key: "action",
            render: (item: TSalary) => {
              return (
                <Space>
                  <Link to={`/${user!.role}/employee/${item._id}`}>Edit</Link>

                  <Button
                    danger
                    onClick={() => handleDeleted(item._id as string)}
                  >
                    Delete
                  </Button>
                </Space>
              );
            },
          },
        ]
      : []),
  ];
  const { data, isError, isLoading } = useGetAllEmployeesQuery(undefined);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between mb-2">
        <SectionTitle title=" Employee Sheet" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :
          <span className="text-red-500"> {data?.totalPrice?.toFixed(2)}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          // style={{ tableLayout: "auto" }}
          bordered
          columns={colums}
          dataSource={data?.data}
          rowKey="_id"
          scroll={{ y: 55 * 7 }}
          pagination={false}
        />
      </div>
      {previewOpen && (
        <Modal
          title="Employee Photo"
          onCancel={() => setPreviewOpen(false)}
          footer={null}
        >
          <Image src={previewImage} alt="Employee Photo" />
        </Modal>
      )}
    </div>
  );
};

export default SalaryTable;
