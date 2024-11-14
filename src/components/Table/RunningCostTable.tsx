import { DatePicker, DatePickerProps, Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { useState } from "react";
import { userRole } from "../../constants/userRole";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetTodayBuyerDevelopmentQuery } from "../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { useGetTodayEmployeesQuery } from "../../redux/features/employee/employeeApi";
import { useGetTodayFactoryQuery } from "../../redux/features/Factory development/factoryDevelopmentApi";
import { useGetTodayFixedCostQuery } from "../../redux/features/fixedCost/fixedCostApi";
import { useGetTodayLoanQuery } from "../../redux/features/loan/loanApi";
import { useGetTodayMiscellaneousQuery } from "../../redux/features/Miscellaneous/MiscellaneousApi";
import { useGetTodayTravellingsQuery } from "../../redux/features/travelling/travellingApi";
import { useGetTodayUtilityQuery } from "../../redux/features/utility/utilityApi";
import { useAppSelector } from "../../redux/hook";
import { runningColums, TFixed, TUtility } from "../../types";
import { verifyToken } from "../../utilis/verifyToken";
import ReportForm from "../ui/form/ReportForm";
import Loading from "../ui/Loading";
import SectionTitle from "../ui/SectionTitle";
import EvaluationTable from "./EvaluationTable";

const RunningCostTable = () => {
  // State to hold selected date
  const [selectedDate, setSelectedDate] = useState<string | string[]>("");
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  // Function to handle date change

  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setSelectedDate(dateString);
  };
  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future
    return (
      current.isBefore(dayjs().subtract(45, "day")) || current.isAfter(dayjs())
    );
  };
  // Query params (send the date if selected, otherwise use today's date)
  const queryParams = selectedDate
    ? { date: selectedDate }
    : { date: moment().format("DD-MMM-YYYY") }; // Default to today if no date selected
  const {
    data: miscData,
    isError: isMiscError,
    isLoading: isMiscLoading,
    isFetching: isMiscFetching,
  } = useGetTodayMiscellaneousQuery(queryParams);
  const {
    data: travelData,
    isError: isTravelError,
    isLoading: isTravelLoading,
    isFetching: isTravelFetching,
  } = useGetTodayTravellingsQuery(queryParams);
  const {
    data: buyerData,
    isError: isBuyerError,
    isLoading: isBuyerLoading,
    isFetching: isBuyerFetching,
  } = useGetTodayBuyerDevelopmentQuery(queryParams);
  const {
    data: factoryData,
    isError: isFactoryError,
    isLoading: isFactoryLoading,
    isFetching: isFactoryFetching,
  } = useGetTodayFactoryQuery(queryParams);
  const {
    data: loanData,
    isError: isLoanError,
    isLoading: isLoanLoading,
    isFetching: isLoanFetching,
  } = useGetTodayLoanQuery(queryParams);
  const {
    data: utilityData,
    isError: isUtilityError,
    isLoading: isUtilityLoading,
    isFetching: isUtilityFetching,
  } = useGetTodayUtilityQuery(queryParams);
  const {
    data: fixedCostData,
    isError: isFixedCostError,
    isLoading: isFixedCostLoading,
    isFetching: isFixedCostFetching,
  } = useGetTodayFixedCostQuery(queryParams);
  const {
    data: employeeCostData,
    isError: isEmployeeCostError,
    isLoading: isEmployeeCostLoading,
    isFetching: isEmployeeCostFetching,
  } = useGetTodayEmployeesQuery(queryParams);

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
      unit: "Day",
      particulars: "Factory Rent",
      paymentType: "Daily",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.factoryRevenue.map((i) => ({
      date: item.date,
      particulars: "Factory Revenue",
      unit: "Day",
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
      unit: "Day",
      paymentType: "Monthly",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.water.map((i) => ({
      date: item.date,
      remark: "water",
      paymentType: "Monthly",
      unit: "Day",
      unitPrice: i.unitPrice, // Directly take the unitPrice
      totalPrice: i.totalPrice, // Directly take the totalPrice
    })),
    ...item.electricity.map((e) => ({
      date: item.date,
      remark: "electricity",
      unit: "Day",
      paymentType: "Monthly",
      unitPrice: e.unitPrice, // Directly take the unitPrice
      totalPrice: e.totalPrice, // Directly take the totalPrice
    })),
    ...(item?.others || []).map((o) => ({
      date: item.date,
      remark: "others",
      unit: "Day",
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
    { ...travelData?.data, particulars: "Travelling Allowance" },
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

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-1 items-center justify-between mb-2">
        <SectionTitle title="Factory Running Cost" />
        <DatePicker onChange={onChangeDate} disabledDate={disableDates} />
        <div className="text-sm md:text-lg lg:text-3xl font-bold">
          Total cost :<span className="text-red-500"> {roundCost}</span>
        </div>
      </div>
      <div className="responsive-table-container">
        <Table
          loading={
            isMiscFetching ||
            isTravelFetching ||
            isBuyerFetching ||
            isFactoryFetching ||
            isLoanFetching ||
            isUtilityFetching ||
            isFixedCostFetching ||
            isEmployeeCostFetching
          }
          size="small"
          className="table-auto"
          bordered
          columns={[
            {
              title: "SL",
              width: 40,
              key: "slNo",
              render: (_, record: { date: string }, index: number) => {
                console.log(record.date); // Example usage
                return index + 1;
              },
            },
            ...runningColums,
          ]}
          dataSource={combinedData}
          // scroll={{ y: 55 * 7 }}
          // tableLayout="auto"
          pagination={false}
          rowKey="_id"
        />
      </div>
      <EvaluationTable
        totalCost={roundCost}
        date={queryParams.date?.toString()}
      />
      {user?.role === userRole.superAdmin ||
      user?.role === userRole.ADMIN ||
      user?.role === userRole.ExecutiveDirector ? (
        <ReportForm
          runningCost={roundCost}
          date={queryParams.date?.toString()}
        />
      ) : null}
    </>
  );
};

export default RunningCostTable;
