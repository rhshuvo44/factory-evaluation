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
import Loan from "../pages/loan/Loan";
import LoanForm from "../pages/loan/LoanForm";
import LoanUpdate from "../pages/loan/LoanUpdate";
import Miscellaneous from "../pages/Miscellaneous/Miscellaneous";
import MiscellaneousForm from "../pages/Miscellaneous/MiscellaneousForm";
import MiscellaneousUpdate from "../pages/Miscellaneous/MiscellaneousUpdate";
import Production from "../pages/Production/Production";
import Report from "../pages/report/Report";
import Salary from "../pages/salary/Salary";
import SalaryForm from "../pages/salary/SalaryForm";
import TravellingAllowance from "../pages/travellingAllowance/TravellingAllowance";
import TravellingAllowanceForm from "../pages/travellingAllowance/TravellingAllowanceForm";
import TravellingAllowanceUpdate from "../pages/travellingAllowance/TravellingAllowanceUpdate";
import Utility from "../pages/utility/Utility";

export const executivePaths = [
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
    name: "Miscellaneous cost",
    children: [
      {
        name: "Add Miscellaneous cost",
        path: "add_misc_cost",
        element: <MiscellaneousForm />,
      },
      {
        path: "misc_cost/:id",
        element: <MiscellaneousUpdate />,
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
        path: "buyer_development/:id",
        element: <BuyerDevelopmentUpdate />,
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
        path: "factory_development/:id",
        element: <FactoryDevelopmentUpdate />,
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
    name: "Production Report",
    path: "all_production_reports",
    element: <Production />,
  },
  {
    name: "View Report",
    path: "all_reports",
    element: <Report />,
  },
];
