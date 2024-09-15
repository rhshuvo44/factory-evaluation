import { NavLink } from "react-router-dom";
import { TRoute, TSidebarItem } from "../types/adminRoutesType";

const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "dashboard",
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
        path: "Add_salary_cost",
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
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Factory Development cost",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Loan Return",
    children: [
      {
        name: "Add Loan Return",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Loan Return",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Utility Bill",
    children: [
      {
        name: "Add Utility Bill",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Utility Bill",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Collection",
    children: [
      {
        name: "Add Collection",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Collection",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Fixed cost",
    children: [
      {
        name: "Add Fixed cost",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Fixed cost",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Production Report",
    children: [
      {
        name: "Add Production Report",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Production Report",
        path: "allUsers",
        element: "allUsers",
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

export const adminSidebarItems = adminPaths.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
        title: item.name,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        title: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
          title: child.name,
        })),
      });
    }

    return acc;
  },
  []
);

export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }

  return acc;
}, []);
