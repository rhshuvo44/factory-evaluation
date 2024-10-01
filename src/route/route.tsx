import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import { routeGenerator } from "../utilis/routesGenerator";
import { adminPaths } from "./admin.routes";
import { coordinatorPaths } from "./Coordinator.routes";
import { executivePaths } from "./ExecutiveDirector.routes";
import { generalPaths } from "./generalDirector.routes";
import { managingPaths } from "./ManagingDirector.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { userRole } from "../constants/userRole";

export const router = createBrowserRouter([
  {
    path: "/me",
    element: <App />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={userRole.ADMIN}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/executiveDirector",
    element: (
      <ProtectedRoute role={userRole.ExecutiveDirector}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(executivePaths),
  },
  {
    path: "/managingDirector",
    element: (
      <ProtectedRoute role={userRole.ManagingDirector}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(managingPaths),
  },
  {
    path: "/generalDirector",
    element: (
      <ProtectedRoute role={userRole.GeneralDirector}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(generalPaths),
  },
  {
    path: "/coordinator",
    element: (
      <ProtectedRoute role={userRole.Coordinator}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(coordinatorPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
