import BuyerDevelopment from "../pages/buyer development/BuyerDevelopment";
import BuyerDevelopmentForm from "../pages/buyer development/BuyerDevelopmentForm";
import BuyerDevelopmentUpdate from "../pages/buyer development/BuyerDevelopmentUpdate";
import Collection from "../pages/Collection/Collection";
import CollectionForm from "../pages/Collection/CollectionForm";
import CollectionUpdate from "../pages/Collection/CollectionUpdate";
import Dashboard from "../pages/Dashboard";
import FactoryDevelopment from "../pages/Factory development/FactoryDevelopment";
import FactoryDevelopmentForm from "../pages/Factory development/FactoryDevelopmentForm";
import FactoryDevelopmentUpdate from "../pages/Factory development/FactoryDevelopmentUpdate";
import FixedCost from "../pages/Fixed cost/FixedCost";
import FixedCostForm from "../pages/Fixed cost/FixedCostForm";
import FixedCostUpdate from "../pages/Fixed cost/FixedCostUpdate";
import Loan from "../pages/loan/Loan";
import LoanForm from "../pages/loan/LoanForm";
import LoanUpdate from "../pages/loan/LoanUpdate";
import Miscellaneous from "../pages/Miscellaneous/Miscellaneous";
import MiscellaneousForm from "../pages/Miscellaneous/MiscellaneousForm";
import MiscellaneousUpdate from "../pages/Miscellaneous/MiscellaneousUpdate";
import Order from "../pages/order/Order";
import OrderForm from "../pages/order/OrderForm";
import OrderUpdate from "../pages/order/OrderUpdate";
import Production from "../pages/Production/Production";
import ProductionAdd from "../pages/Production/ProductionAdd";
import ProductionUpdate from "../pages/Production/ProductionUpdate";
import ProductionCost from "../pages/productionCost/ProductionCost";
import ProductionCostForm from "../pages/productionCost/ProductionCostForm";
import ProductionCostUpdate from "../pages/productionCost/ProductionCostUpdate";
import Report from "../pages/report/Report";
import Salary from "../pages/salary/Salary";
import SalaryForm from "../pages/salary/SalaryForm";
import SalaryUpdate from "../pages/salary/SalaryUpdate";
import TravellingAllowance from "../pages/travellingAllowance/TravellingAllowance";
import TravellingAllowanceForm from "../pages/travellingAllowance/TravellingAllowanceForm";
import TravellingAllowanceUpdate from "../pages/travellingAllowance/TravellingAllowanceUpdate";

import AddUser from "../pages/user management/AddUser";
import AllUsers from "../pages/user management/AllUsers";
import UserUpdate from "../pages/user management/UserUpdate";
import Utility from "../pages/utility/Utility";
import UtilityForm from "../pages/utility/UtilityForm";
import UtilityUpdate from "../pages/utility/UtilityUpdate";

export const adminPaths = [
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
    children: [
      {
        name: "Add Travel Allowance",
        path: "add_travel_allowance",
        element: <TravellingAllowanceForm />,
      },
      {
        path: "travel_allowance/:id",
        element: <TravellingAllowanceUpdate />,
      },
      {
        name: "All Travel Allowance",
        path: "all_travel_allowance",
        element: <TravellingAllowance />,
      },
    ],
  },
  {
    name: "Miscellaneous",
    children: [
      {
        name: "Add Miscellaneous ",
        path: "add_misc_cost",
        element: <MiscellaneousForm />,
      },
      {
        path: "misc_cost/:id",
        element: <MiscellaneousUpdate />,
      },
      {
        name: "All Miscellaneous",
        path: "all_misc_cost",
        element: <Miscellaneous />,
      },
    ],
  },
  {
    name: "Buyer Development",
    children: [
      {
        name: "Add Buyer Development",
        path: "add_buyer_development",
        element: <BuyerDevelopmentForm />,
      },
      {
        path: "buyer_development/:id",
        element: <BuyerDevelopmentUpdate />,
      },
      {
        name: "All Buyer Development",
        path: "all_buyer_development",
        element: <BuyerDevelopment />,
      },
    ],
  },
  {
    name: "Employees",
    children: [
      {
        name: "Add Employee",
        path: "add_salary_cost",
        element: <SalaryForm />,
      },
      {
        path: "employee/:id",
        element: <SalaryUpdate />,
      },
      {
        name: "All Employee",
        path: "all_salary_cost",
        element: <Salary />,
      },
    ],
  },
  {
    name: "Factory Development",
    children: [
      {
        name: "Add Factory Development",
        path: "add_factory_development",
        element: <FactoryDevelopmentForm />,
      },
      {
        path: "factory_development/:id",
        element: <FactoryDevelopmentUpdate />,
      },
      {
        name: "All Factory Development",
        path: "all_factory_development",
        element: <FactoryDevelopment />,
      },
    ],
  },
  {
    name: "Loan Return",
    children: [
      {
        name: "Add Loan Return",
        path: "add_loan",
        element: <LoanForm />,
      },
      {
        path: "loan/:id",
        element: <LoanUpdate />,
      },
      {
        name: "All Loan Return",
        path: "all_loan",
        element: <Loan />,
      },
    ],
  },
  {
    name: "Utility Bill",
    children: [
      {
        name: "Add Utility Bill",
        path: "add_bill",
        element: <UtilityForm />,
      },
      {
        path: "utility/:id",
        element: <UtilityUpdate />,
      },
      {
        name: "All Utility Bill",
        path: "all_bill",
        element: <Utility />,
      },
    ],
  },
  {
    name: "Fixed cost",
    children: [
      {
        name: "Add Fixed cost",
        path: "add_fixed_cost",
        element: <FixedCostForm />,
      },
      {
        path: "fixed-cost/:id",
        element: <FixedCostUpdate />,
      },
      {
        name: "All Fixed cost",
        path: "all_fixed_cost",
        element: <FixedCost />,
      },
    ],
  },
  {
    name: "Production Cost",
    children: [
      {
        name: "Add Production Cost",
        path: "add_production_cost",
        element: <ProductionCostForm />,
      },
      {
        path: "production_cost/:id",
        element: <ProductionCostUpdate />,
      },
      {
        name: "All Production Cost",
        path: "all_production_costs",
        element: <ProductionCost />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    name: "Collection",
    children: [
      {
        name: "Add Collection",
        path: "add_collection",
        element: <CollectionForm />,
      },
      {
        path: "collection/:id",
        element: <CollectionUpdate />,
      },
      {
        name: "All Collection",
        path: "all-collection:",
        element: <Collection />,
      },
    ],
  },
  {
    type: "divider",
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
    ],
  },
  {
    type: "divider",
  },
  {
    name: "View Report",
    path: "all_reports",
    element: <Report />,
  },
  {
    type: "divider",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Add User",
        path: "add_user",
        element: <AddUser />,
      },
      {
        path: "user/:id",
        element: <UserUpdate />,
      },
      {
        name: "All Users",
        path: "all_users",
        element: <AllUsers />,
      },
    ],
  },
];
