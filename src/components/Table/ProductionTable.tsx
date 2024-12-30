import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table, TableColumnType } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
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
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../ui/Loading";
type DataIndex = keyof TProductionReport;
const ProductionTable = () => {
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
  ): TableColumnType<TProductionReport> => ({
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

  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [deleteProduction] = useDeletedProductionMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteProduction(id);
    if (res.data.success) {
      toast.success("Production report deleted successfully.");
    }
  };

  const { data, isError, isLoading } = useGetAllProductionQuery(undefined);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div className="responsive-table-container">
      <Table
        size="small"
        className="table-auto"
        bordered
        columns={[
          {
            title: "Order No",
            dataIndex: "orderNo",
            key: "orderNo",
            ...getColumnSearchProps("orderNo"),
          },
          ...productionColums,
          ...(user?.role === userRole.superAdmin ||
          user?.role === userRole.ADMIN ||
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
                        <Button
                          danger
                          onClick={() => handleDeleted(item._id as string)}
                        >
                          Delete
                        </Button>
                        {/* Conditionally render "Edit" if quantities match */}
                        {item.quantity === item.packingCompleted ? (
                          <Button type="primary">Finished</Button>
                        ) : (
                          <Button>Running</Button>
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
        scroll={{ x: 100 }}
        // tableLayout="auto"
        // pagination={false}
      />
    </div>
  );
};

export default ProductionTable;
