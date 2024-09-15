import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { adminRoutes } from "./admin.routes";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/",
    element: <Login />,
  },
]);
