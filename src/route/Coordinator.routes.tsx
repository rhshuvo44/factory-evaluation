import TravellingTable from "../components/Table/TravellingTable";
import BuyerDevelopment from "../pages/buyer development/BuyerDevelopment";
import Collection from "../pages/Collection/Collection";
import Dashboard from "../pages/Dashboard";
import FactoryDevelopment from "../pages/Factory development/FactoryDevelopment";
import FixedCost from "../pages/Fixed cost/FixedCost";
import Loan from "../pages/loan/Loan";
import Miscellaneous from "../pages/Miscellaneous/Miscellaneous";
import Order from "../pages/order/Order";
import OrderForm from "../pages/order/OrderForm";
import OrderUpdate from "../pages/order/OrderUpdate";
import Production from "../pages/Production/Production";
import ProductionAdd from "../pages/Production/ProductionAdd";
import ProductionUpdate from "../pages/Production/ProductionUpdate";
import ProductionCost from "../pages/productionCost/ProductionCost";
import Report from "../pages/report/Report";
import Salary from "../pages/salary/Salary";
import TargetOutput from "../pages/targetOutput/TargetOutput";
import TargetOutputAdd from "../pages/targetOutput/TargetOutputAdd";
import TargetOutputUpdate from "../pages/targetOutput/TargetOutputUpdate";
import Utility from "../pages/utility/Utility";

export const coordinatorPaths = [
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
    name: "Orders",
    children: [
      {
        name: "Add Order",
        path: "add_order",
        element: <OrderForm />,
      },
      {
        path: "order/:id",
        element: <OrderUpdate />,
      },
      {
        name: "All Orders",
        path: "all_orders",
        element: <Order />,
      },
    ],
  },
  {
    name: "Production Report",
    children: [
      {
        name: "Add Production Report",
        path: "add_production_report",
        element: <ProductionAdd />,
      },
      {
        path: "production/:id",
        element: <ProductionUpdate />,
      },
      {
        name: "All Production Report",
        path: "all_production_reports",
        element: <Production />,
      },
      {
        name: "Add Target",
        path: "add_target",
        element: <TargetOutputAdd />,
      },
      {
        path: "target/:id",
        element: <TargetOutputUpdate />,
      },
      {
        name: "All Target",
        path: "all_target",
        element: <TargetOutput />,
      },
    ],
  },
  {
    name: "Production Cost",

    path: "all_production_costs",
    element: <ProductionCost />,
  },
  {
    name: "View Report",
    path: "all_reports",
    element: <Report />,
  },
];
