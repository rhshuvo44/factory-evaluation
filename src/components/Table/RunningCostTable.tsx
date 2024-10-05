import { Table } from "antd";
import { useState } from "react";
import { useGetTodayMiscellaneousQuery } from "../../redux/features/Miscellaneous/MiscellaneousApi";
import { useGetTodayTravellingsQuery } from "../../redux/features/travelling/travellingApi";
import { TBuyer, TMiscellaneous, TTravel } from "../../types";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
import { useGetTodayBuyerDevelopmentQuery } from "../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { useGetTodayFactoryQuery } from "../../redux/features/Factory development/factoryDevelopmentApi";
import { useGetTodayLoanQuery } from "../../redux/features/loan/loanApi";

const RunningCostTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: miscData,
    isError: isMiscError,
    isLoading: isMiscLoading,
  } = useGetTodayMiscellaneousQuery(undefined);
  const {
    data: travelData,
    isError: isTravelError,
    isLoading: isTravelLoading,
  } = useGetTodayTravellingsQuery(undefined);
  const {
    data: buyerData,
    isError: isBuyerError,
    isLoading: isBuyerLoading,
  } = useGetTodayBuyerDevelopmentQuery(undefined);
  const {
    data: factoryData,
    isError: isFactoryError,
    isLoading: isFactoryLoading,
  } = useGetTodayFactoryQuery(undefined);
  const {
    data: loanData,
    isError: isLoanError,
    isLoading: isLoanLoading,
  } = useGetTodayLoanQuery(undefined);
  if (
    isMiscLoading ||
    isTravelLoading ||
    isBuyerLoading ||
    isFactoryLoading ||
    isLoanLoading
  )
    return <Loading />;
  if (
    isMiscError ||
    isTravelError ||
    isBuyerError ||
    isFactoryError ||
    isLoanError
  )
    return <div>Error loading data</div>;

  // Combine the data into a single array
  const combinedData = [
    ...(miscData?.data || []).map((item: TMiscellaneous) => ({
      ...item,
      source: "Miscellaneous",
    })),
    ...(travelData?.data || []).map((item: TTravel) => ({
      ...item,
      source: "Travel",
    })),
    ...(buyerData?.data || []).map((item: TBuyer) => ({
      ...item,
      source: "Buyer Development",
    })),
    ...(factoryData?.data || []).map((item: TBuyer) => ({
      ...item,
      source: "Factory Development",
    })),
    ...(loanData?.data || []).map((item: TBuyer) => ({
      ...item,
      source: "Loan Returns",
    })),
  ];
  const totalCost = combinedData.reduce(
    (sum, price) => sum + price.unitPrice,
    0
  );

  const colums = [
    {
      title: "SL",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
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
      dataIndex: "buyerId",
      key: "buyerId",
    },
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Pay To",
      dataIndex: "payTo",
      key: "payTo",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  return (
    <div>
      <div className="flex  items-center justify-between mb-2">
        <SectionTitle title="Factory Running Cost" />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :<span className="text-red-500"> {totalCost}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          size="small"
          className="table-auto"
          bordered
          columns={colums}
          dataSource={combinedData}
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
    </div>
    //   <div>
    //   <SectionTitle title="Combined Data" />
    //   <Table
    //     bordered
    //     size="small"
    //     columns={columns}
    //     dataSource={combinedData}
    //     rowKey="_id"
    //     pagination={{
    //       current: currentPage,
    //       pageSize: pageSize,
    //       onChange: (page, pageSize) => {
    //         setCurrentPage(page);
    //         setPageSize(pageSize);
    //       },
    //     }}
    //   />
    // </div>
  );
};

export default RunningCostTable;
