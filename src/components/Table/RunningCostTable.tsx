import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { useGetTodayBuyerDevelopmentQuery } from "../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { useGetTodayFactoryQuery } from "../../redux/features/Factory development/factoryDevelopmentApi";
import { useGetTodayFixedCostQuery } from "../../redux/features/fixedCost/fixedCostApi";
import { useGetTodayLoanQuery } from "../../redux/features/loan/loanApi";
import { useGetTodayMiscellaneousQuery } from "../../redux/features/Miscellaneous/MiscellaneousApi";
import { useGetTodayTravellingsQuery } from "../../redux/features/travelling/travellingApi";
import { useGetTodayUtilityQuery } from "../../redux/features/utility/utilityApi";
import {
  TBuyer,
  TFactory,
  TFixed,
  TLoan,
  TMiscellaneous,
  TTravel,
  TUtility,
} from "../../types";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
import EvaluationTable from "./EvaluationTable";

const RunningCostTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

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
  const {
    data: utilityData,
    isError: isUtilityError,
    isLoading: isUtilityLoading,
  } = useGetTodayUtilityQuery(undefined);
  const {
    data: fixedCostData,
    isError: isFixedCostError,
    isLoading: isFixedCostLoading,
  } = useGetTodayFixedCostQuery(undefined);
  if (
    isMiscLoading ||
    isTravelLoading ||
    isBuyerLoading ||
    isFactoryLoading ||
    isLoanLoading ||
    isUtilityLoading ||
    isFixedCostLoading
  )
    return <Loading />;
  if (
    isMiscError ||
    isTravelError ||
    isBuyerError ||
    isFactoryError ||
    isLoanError ||
    isUtilityError ||
    isFixedCostError
  )
    return <div>Error loading data</div>;
  const fixedCost = (fixedCostData?.data || []).map((item: TFixed) => ({
    ...item,
  }));

  const fixedCostComData = fixedCost.flatMap((item: TFixed) => [
    ...item.factoryRent.map((i) => ({
      date: item.date,
      remark: "factoryRent",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.factoryRevenue.map((i) => ({
      date: item.date,
      remark: "factoryRevenue",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.honorary.map((e) => ({
      date: item.date,
      remark: "honorary",
      unitPrice: e.unitPrice, // Directly take the unitPrice
      totalPrice: e.totalPrice, // Directly take the totalPrice
    })),
  ]);

  const utility = (utilityData?.data || []).map((item: TUtility) => ({
    ...item,
  }));

  const utilityComData = utility.flatMap((item: TUtility) => [
    ...item.internet.map((i) => ({
      date: item.date,
      remark: "internet",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.water.map((i) => ({
      date: item.date,
      remark: "water",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.electricity.map((e) => ({
      date: item.date,
      remark: "electricity",
      unitPrice: e.unitPrice, // Directly take the unitPrice
      totalPrice: e.totalPrice, // Directly take the totalPrice
    })),
    ...(item?.others || []).map((o) => ({
      date: item.date,
      remark: "others",
      unitPrice: o.unitPrice, // Directly take the unitPrice
      totalPrice: o.totalPrice, // Directly take the totalPrice
    })),
  ]);

  // Combine the data into a single array
  const combinedData = [
    ...(fixedCostComData || []).map((item: TFixed) => ({
      ...item,
      source: "Fixed cost",
    })),
    ...(utilityComData || []).map((item: TUtility) => ({
      ...item,
      source: "Utility Bills",
    })),
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
    ...(factoryData?.data || []).map((item: TFactory) => ({
      ...item,
      source: "Factory Development",
    })),
    ...(loanData?.data || []).map((item: TLoan) => ({
      ...item,
      source: "Loan Returns",
    })),
  ];

  const totalCost: number = combinedData.reduce(
    (sum, price) => sum + price.unitPrice,
    0
  );
  const roundCost = parseFloat(totalCost.toFixed(2));
  const colums: ColumnType<{ date: string }>[] = [
    {
      title: "SL",
      // dataIndex: "slNo",
      key: "slNo",
      render: (_, record: { date: string }, index: number) => {
        console.log(record.date); // Example usage
        return (currentPage - 1) * pageSize + index + 1;
      },
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
          Total cost :<span className="text-red-500"> {roundCost}</span>
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
      <EvaluationTable totalCost={roundCost} />
    </div>
  );
};

export default RunningCostTable;
