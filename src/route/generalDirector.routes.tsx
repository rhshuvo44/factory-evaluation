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
import ProductionCost from "../pages/productionCost/ProductionCost";
import Report from "../pages/report/Report";
import Salary from "../pages/salary/Salary";
import Utility from "../pages/utility/Utility";

export const generalPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    type: "divider",
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
    name: "Production Cost",
    path: "all_production_costs",
    element: <ProductionCost />,
  },
  {
    name: "Utility Bill",
    path: "all_bill",
    element: <Utility />,
  },
  {
    name: "Fixed cost",
    path: "all_fixed_cost",
    element: <FixedCost />,
  },
  {
    type: "divider",
  },
  {
    name: "Collection",
    path: "all-collection:",
    element: <Collection />,
  },
  {
    type: "divider",
  },

  {
    name: "All Orders",
    path: "all_orders",
    element: <Order />,
  },
  {
    name: "Production Report",
    path: "all_production_reports",
    element: <Production />,
  },
  
  {
    type: "divider",
  },
  {
    name: "View Report",
    path: "all_reports",
    element: <Report />,
  },
];
