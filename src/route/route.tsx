import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);
