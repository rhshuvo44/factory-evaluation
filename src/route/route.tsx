import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { userRole } from "../constants/userRole";
import Dashboard from "../pages/Dashboard";
import Forget from "../pages/Forget";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import Setting from "../pages/Setting";
import { routeGenerator } from "../utilis/routesGenerator";
import { adminPaths } from "./admin.routes";
import { coordinatorPaths } from "./Coordinator.routes";
import { executivePaths } from "./ExecutiveDirector.routes";
import { generalPaths } from "./generalDirector.routes";
import { managingPaths } from "./ManagingDirector.routes";
import Notification from "../pages/Notification";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <Forget />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
    path: "/settings",
    element: <App />,
    children: [
      {
        index: true,
        element: <Setting />,
      },
    ],
  },
  {
    path: "/notification",
    element: <App />,
    children: [
      {
        index: true,
        element: <Notification />,
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
]);
