import BuyerDevelopment from "../pages/buyer development/BuyerDevelopment";
import BuyerDevelopmentForm from "../pages/buyer development/BuyerDevelopmentForm";
import Collection from "../pages/Collection/Collection";
import CollectionForm from "../pages/Collection/CollectionForm";
import Dashboard from "../pages/Dashboard";
import FactoryDevelopment from "../pages/Factory development/FactoryDevelopment";
import FactoryDevelopmentForm from "../pages/Factory development/FactoryDevelopmentForm";
import Loan from "../pages/loan/Loan";
import LoanForm from "../pages/loan/LoanForm";
import Miscellaneous from "../pages/Miscellaneous/Miscellaneous";
import MiscellaneousForm from "../pages/Miscellaneous/MiscellaneousForm";
import Salary from "../pages/salary/Salary";
import SalaryForm from "../pages/salary/SalaryForm";
import TravellingAllowance from "../pages/travellingAllowance/TravellingAllowance";
import TravellingAllowanceForm from "../pages/travellingAllowance/TravellingAllowanceForm";
import AddUser from "../pages/user management/AddUser";
import AllUsers from "../pages/user management/AllUsers";
import Utility from "../pages/utility/Utility";
import UtilityForm from "../pages/utility/UtilityForm";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
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
        name: "All Travel Allowance",
        path: "all_travel_allowance",
        element: <TravellingAllowance />,
      },
    ],
  },
  {
    name: "Miscellaneous cost",
    children: [
      {
        name: "Add Miscellaneous cost",
        path: "add_misc_cost",
        element: <MiscellaneousForm />,
      },
      {
        name: "All Miscellaneous cost",
        path: "all_misc_cost",
        element: <Miscellaneous />,
      },
    ],
  },
  {
    name: "Buyer Development cost",
    children: [
      {
        name: "Add Buyer Development cost",
        path: "add_buyer_development",
        element: <BuyerDevelopmentForm />,
      },
      {
        name: "All Buyer Development cost",
        path: "all_buyer_development",
        element: <BuyerDevelopment />,
      },
    ],
  },
  {
    name: "Employee salary cost",
    children: [
      {
        name: "Add Employee salary cost",
        path: "add_salary_cost",
        element: <SalaryForm />,
      },
      {
        name: "All Employee salary cost",
        path: "all_salary_cost",
        element: <Salary />,
      },
    ],
  },
  {
    name: "Factory Development cost",
    children: [
      {
        name: "Add Factory Development cost",
        path: "add_factory_development",
        element: <FactoryDevelopmentForm />,
      },
      {
        name: "All Factory Development cost",
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
        name: "All Utility Bill",
        path: "all_bill",
        element: <Utility />,
      },
    ],
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
        name: "All Collection",
        path: "all-collection:",
        element: <Collection />,
      },
    ],
  },
  {
    name: "Fixed cost",
    children: [
      {
        name: "Add Fixed cost",
        path: "add_fixed_cost",
        element: "Add fixed cost",
      },
      {
        name: "All Fixed cost",
        path: "all_fixed_cost",
        element: "all Fixed cost",
      },
    ],
  },
  {
    name: "Production Report",
    children: [
      {
        name: "Add Production Report",
        path: "add_production_report",
        element: "addProductionReport",
      },
      {
        name: "All Production Report",
        path: "all_production_reports",
        element: "all Production Report",
      },
    ],
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
        name: "All Users",
        path: "all_users",
        element: <AllUsers />,
      },
    ],
  },
];
