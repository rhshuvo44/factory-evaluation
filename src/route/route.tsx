import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { routeGenerator } from "../utilis/routesGenerator";
import { adminPaths } from "./admin.routes";
import { executivePaths } from "./ExecutiveDirector.routes";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/executive-director",
    element: <App />,
    children: routeGenerator(executivePaths),
  },
  {
    path: "/managing-director",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/general-director",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/coordinator",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/",
    element: <Login />,
  },
]);
