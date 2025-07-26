import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../layout/MainLayout";


import { publicRoutes } from "./publicRoutes";
import { withRoleProtection } from "../utils/RoutesUtils/withRoleProtection";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import DashboardLayout from "../pages/Dashboard/Dashboard Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import  ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: publicRoutes
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children:[
       {
        index : true,
        path: "",
        element: <Dashboard />,
      },
      ...withRoleProtection(userRoutes,["user"]),
      ...withRoleProtection(adminRoutes,["admin"]),
    ]
  },
  
]);
export default routes;
