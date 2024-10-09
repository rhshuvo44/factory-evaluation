import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { useGetTodayBuyerDevelopmentQuery } from "../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { useGetTodayEmployeesQuery } from "../../redux/features/employee/employeeApi";
import { useGetTodayFactoryQuery } from "../../redux/features/Factory development/factoryDevelopmentApi";
import { useGetTodayFixedCostQuery } from "../../redux/features/fixedCost/fixedCostApi";
import { useGetTodayLoanQuery } from "../../redux/features/loan/loanApi";
import { useGetTodayMiscellaneousQuery } from "../../redux/features/Miscellaneous/MiscellaneousApi";
import { useGetTodayTravellingsQuery } from "../../redux/features/travelling/travellingApi";
import { useGetTodayUtilityQuery } from "../../redux/features/utility/utilityApi";
import { TFixed, TUtility } from "../../types";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
import EvaluationTable from "./EvaluationTable";

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
  const {
    data: employeeCostData,
    isError: isEmployeeCostError,
    isLoading: isEmployeeCostLoading,
  } = useGetTodayEmployeesQuery(undefined);
  if (
    isMiscLoading ||
    isTravelLoading ||
    isBuyerLoading ||
    isFactoryLoading ||
    isLoanLoading ||
    isUtilityLoading ||
    isFixedCostLoading ||
    isEmployeeCostLoading
  )
    return <Loading />;
  if (
    isMiscError ||
    isTravelError ||
    isBuyerError ||
    isFactoryError ||
    isLoanError ||
    isUtilityError ||
    isFixedCostError ||
    isEmployeeCostError
  )
    return <div>Error loading data</div>;
  const fixedCost = (fixedCostData?.data || []).map((item: TFixed) => ({
    ...item,
  }));

  const fixedCostComData = fixedCost.flatMap((item: TFixed) => [
    ...item.factoryRent.map((i) => ({
      date: item.date,
      unit:"Day",
      particulars: "Factory Rent",
      paymentType: "Daily",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.factoryRevenue.map((i) => ({
      date: item.date,
      particulars: "Factory Revenue",
      unit:"Day",
      paymentType: "Daily",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.honorary.map((e) => ({
      date: item.date,
      unit: "Day",
      paymentType: "Monthly",
      particulars: "Honorary",
      unitPrice: e.unitPrice, // Directly take the unitPrice
      totalPrice: e.totalPrice, // Directly take the totalPrice
    })),
  ]);

  const utility = (utilityData?.data || []).map((item: TUtility) => ({
    ...item,
  }));

  const utilityComData = utility?.flatMap((item: TUtility) => [
    ...item.internet.map((i) => ({
      date: item.date,
      remark: "internet",
      unit:"Day",
      paymentType: "Monthly",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.water.map((i) => ({
      date: item.date,
      remark: "water",
      paymentType: "Monthly",
      unit:"Day",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.electricity.map((e) => ({
      date: item.date,
      remark: "electricity",
      unit:"Day",
      paymentType: "Monthly",
      unitPrice: e.unitPrice, // Directly take the unitPrice
      totalPrice: e.totalPrice, // Directly take the totalPrice
    })),
    ...(item?.others || []).map((o) => ({
      date: item.date,
      remark: "others",
      unit:"Day",
      paymentType: "Monthly",
      unitPrice: o.unitPrice, // Directly take the unitPrice
      totalPrice: o.totalPrice, // Directly take the totalPrice
    })),
  ]);

  // Combine the data into a single array
  const combinedData = [
    ...(fixedCostComData || []).map((item: TFixed) => ({
      ...item,
    })),
    ...(utilityComData || []).map((item: TUtility) => ({
      ...item,
      particulars: "Utility Bills",
    })),

    { ...miscData?.data, particulars: "Miscellaneous" },
    // ...(travelData?.data || []).map((item: TTravel) => ({
    //   ...item,
    //   particulars: "Travel",
    // })),

    { ...travelData?.data, particulars: "Travel" },
    { ...buyerData?.data, particulars: "Buyer Development" },
    { ...factoryData?.data, particulars: "Factory Development" },
    { ...loanData?.data, particulars: "Loan Returns" },
    { ...employeeCostData?.data, particulars: "Employee" },
  ];
  const totalCost: number = combinedData.reduce(
    (sum, price) => sum + price.unitPrice,
    0
  );

  const roundCost = parseFloat(totalCost.toFixed(2));
  const colums: ColumnType<{ date: string }>[] = [
    {
      title: "SL",
      key: "slNo",
      render: (_, record: { date: string }, index: number) => {
        console.log(record.date); // Example usage
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
    {
      title: "Description",
      dataIndex: "date",
      key: "date",
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
          // pagination={false}
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
