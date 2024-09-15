import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
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
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Travel Allowance",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Miscellaneous cost ",
    children: [
      {
        name: "Add Miscellaneous cost",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Miscellaneous cost",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Buyer Development cost",
    children: [
      {
        name: "Add Buyer Development cost",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Buyer Development cost",
        path: "allUsers",
        element: "allUsers",
      },
    ],
  },
  {
    name: "Employee salary cost",
    children: [
      {
        name: "Add Employee salary cost",
        path: "addUser",
        element: "addUser",
      },
      {
        name: "All Employee salary cost",
        path: "allUsers",
        element: "allUsers",
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
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
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
