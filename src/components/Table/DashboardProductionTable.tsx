import { Table } from "antd";
import { useGetTodayProductionQuery } from "../../redux/features/productionReport/productionApi";
import { DashboardProductionColumns } from "../../types";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";

const DashboardProductionTable = (date: { date: string }) => {
  const { data, isLoading, isError } = useGetTodayProductionQuery(date);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between my-2">
        <SectionTitle title="Production Report" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          <span className="text-green-500 px-2">
            Total Packing Completed:{data?.data?.totalPackingCompleted}
          </span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          loading={isLoading}
          columns={DashboardProductionColumns}
          dataSource={data?.data?.data}
          rowKey="_id"
          pagination={false}
          footer={() => (
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Cutting Completed: {data?.data?.totalCuttingCompleted} |
              Total Sewing Output: {data?.data?.totalSewingOutput} | Total
              Finishing Output: {data?.data?.totalFinishingOutput} | Total
              Packing Completed: {data?.data?.totalPackingCompleted}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default DashboardProductionTable;
