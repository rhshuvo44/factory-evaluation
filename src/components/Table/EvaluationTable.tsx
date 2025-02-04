import { Table } from "antd";
import { useGetTodayCollectionsQuery } from "../../redux/features/collection/collectionApi";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const EvaluationTable = ({
  totalCost,
  date,
}: {
  totalCost: number;
  date: string;
}) => {
  const { data, isLoading, isError } = useGetTodayCollectionsQuery(date);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;
  const amount = data?.data?.amount;
  const dataSource = [
    {
      key: "1",
      date: data?.data?.date,
      category: "Factory Running Cost",
      amount: totalCost,
    },
    {
      key: "2",
      date: data?.data?.date,
      category: "Factory Collection",
      amount: amount,
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between my-2">
        <SectionTitle title="Factory Evaluation Cost" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          {totalCost >= amount ? (
            <span className="text-red-500">
              Loss:{parseFloat((totalCost - amount).toFixed(2))}
            </span>
          ) : (
            <span className="text-green-500 px-2">
              Profit:{parseFloat((amount - totalCost).toFixed(2))}
            </span>
          )}
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={dataSource}
          rowKey="_id"
          pagination={false}
        />
      </div>
    </>
  );
};

export default EvaluationTable;
 