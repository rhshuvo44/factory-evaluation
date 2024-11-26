import TravellingTable from "../components/Table/TravellingTable";
import BuyerDevelopment from "../pages/buyer development/BuyerDevelopment";
import Collection from "../pages/Collection/Collection";
import Dashboard from "../pages/Dashboard";
import FactoryDevelopment from "../pages/Factory development/FactoryDevelopment";
import FixedCost from "../pages/Fixed cost/FixedCost";
import Loan from "../pages/loan/Loan";
import Miscellaneous from "../pages/Miscellaneous/Miscellaneous";
import Order from "../pages/order/Order";
import Production from "../pages/Production/Production";
import Report from "../pages/report/Report";
import Salary from "../pages/salary/Salary";
import TargetOutput from "../pages/targetOutput/TargetOutput";
import Utility from "../pages/utility/Utility";

export const managingPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Travel Allowance",
    path: "all_travel_allowance",
    element: <TravellingTable />,
  },
  {
    name: "Miscellaneous cost",
    path: "all_misc_cost",
    element: <Miscellaneous />,
  },
  {
    name: "Buyer Development cost",
    path: "all_buyer_development",
    element: <BuyerDevelopment />,
  },
  {
    name: "Employee salary cost",
    path: "all_salary_cost",
    element: <Salary />,
  },
  {
    name: "Factory Development cost",
    path: "all_factory_development",
    element: <FactoryDevelopment />,
  },
  {
    name: "Loan Return",
    path: "all_loan",
    element: <Loan />,
  },
  {
    name: "Utility Bill",
    path: "all_bill",
    element: <Utility />,
  },
  {
    name: "Collection",
    path: "all-collection:",
    element: <Collection />,
  },
  {
    name: "Fixed cost",
    path: "all_fixed_cost",
    element: <FixedCost />,
  },
  {
    name: "Production Report",
    path: "all_production_reports",
    element: <Production />,
  },

  {
    name: "All Orders",
    path: "all_orders",
    element: <Order />,
  },

  {
    name: "All Target",
    path: "all_target",
    element: <TargetOutput />,
  },
  {
    name: "View Report",
    path: "all_reports",
    element: <Report />,
  },
];
