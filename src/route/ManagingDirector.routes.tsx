import TravellingTable from "../components/Table/TravellingTable";
import BuyerDevelopment from "../pages/buyer development/BuyerDevelopment";
import Dashboard from "../pages/Dashboard";
import Miscellaneous from "../pages/Miscellaneous/Miscellaneous";
import Salary from "../pages/salary/Salary";
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
    element: "All Factory Development cost",
  },
  {
    name: "Loan Return",
    path: "all_loan",
    element: "All Loan",
  },
  {
    name: "Utility Bill",
    path: "all_bill",
    element: <Utility />,
  },
  {
    name: "Collection",
    path: "all-collection:",
    element: "All Collection",
  },
  {
    name: "Fixed cost",
    path: "all_fixed_cost",
    element: "all Fixed cost",
  },
  {
    name: "Production Report",
    path: "all_production_reports",
    element: "all Production Report",
  },
];
