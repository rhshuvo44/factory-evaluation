import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { adminRoutes } from "./admin.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
    // children: [
    //   { index: true, element: <h1>Admin dashboard</h1> },
    //   { path: "dashboard", element: <h1>Admin dashboard</h1> },
    // ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
