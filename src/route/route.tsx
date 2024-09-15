import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { routeGenerator } from "../utilis/routesGenerator";
import { adminPaths } from "./admin.routes";
import { coordinatorPaths } from "./Coordinator.routes";
import { executivePaths } from "./ExecutiveDirector.routes";
import { generalPaths } from "./generalDirector.routes";
import { managingPaths } from "./ManagingDirector.routes";

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
    children: routeGenerator(managingPaths),
  },
  {
    path: "/general-director",
    element: <App />,
    children: routeGenerator(generalPaths),
  },
  {
    path: "/coordinator",
    element: <App />,
    children: routeGenerator(coordinatorPaths),
  },
  {
    path: "/",
    element: <Login />,
  },
]);
