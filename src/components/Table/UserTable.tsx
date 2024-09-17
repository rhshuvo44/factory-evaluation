const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const colums = [
    {
      title: "SL No",
      dataIndex: "SL No",
      key: "SL No",
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
      dataIndex: "buyer ID",
      key: "buyer ID",
    },
    {
      title: "Order No",
      dataIndex: "order No",
      key: "order No",
    },
    {
      title: "Pay To",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "Payment Type",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Unit Price",
      dataIndex: "unit price",
      key: "unit price",
    },
    {
      title: "Total Price",
      dataIndex: "total price",
      key: "total price",
    },
    {
      title: "Action",
      key: "action",
      render: (_: number, record: TTravel) => (
        <Button type="link" onClick={() => navigate(`/product/${record.slNo}`)}>
          View Details
        </Button>
      ),
    },
  ];
  const { data, isError, isLoading } = useGetTravellingsQuery({
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
      dataSource={data?.travelling}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: data?.total,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default UserTable;
