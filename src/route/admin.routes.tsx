import Dashboard from "../pages/Dashboard";

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
        element: "Travel Allowance",
      },
      {
        name: "All Travel Allowance",
        path: "all_travel_allowance",
        element: "Travel Allowance",
      },
    ],
  },
  {
    name: "Miscellaneous cost",
    children: [
      {
        name: "Add Miscellaneous cost",
        path: "add_misc_cost",
        element: "Miscellaneous cost",
      },
      {
        name: "All Miscellaneous cost",
        path: "all_misc_cost",
        element: "All Miscellaneous cost",
      },
    ],
  },
  {
    name: "Buyer Development cost",
    children: [
      {
        name: "Add Buyer Development cost",
        path: "add_buyer_development",
        element: "Buyer Development cost",
      },
      {
        name: "All Buyer Development cost",
        path: "all_buyer_development",
        element: "All Buyer Development cost",
      },
    ],
  },
  {
    name: "Employee salary cost",
    children: [
      {
        name: "Add Employee salary cost",
        path: "add_salary_cost",
        element: "Employee salary cost",
      },
      {
        name: "All Employee salary cost",
        path: "all_salary_cost",
        element: "All Employee salary cost",
      },
    ],
  },
  {
    name: "Factory Development cost",
    children: [
      {
        name: "Add Factory Development cost",
        path: "add_factory_development",
        element: "Add Factory Development cost",
      },
      {
        name: "All Factory Development cost",
        path: "all_factory_development",
        element: "All Factory Development cost",
      },
    ],
  },
  {
    name: "Loan Return",
    children: [
      {
        name: "Add Loan Return",
        path: "add_loan",
        element: "Add Loan",
      },
      {
        name: "All Loan Return",
        path: "all_loan",
        element: "All Loan",
      },
    ],
  },
  {
    name: "Utility Bill",
    children: [
      {
        name: "Add Utility Bill",
        path: "add_bill",
        element: "Add Utility Bill",
      },
      {
        name: "All Utility Bill",
        path: "all_bill",
        element: "Add Utility Bill",
      },
    ],
  },
  {
    name: "Collection",
    children: [
      {
        name: "Add Collection",
        path: "add_collection",
        element: "Add Collection",
      },
      {
        name: "All Collection",
        path: "all-collection:",
        element: "All Collection",
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
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Users",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
];
