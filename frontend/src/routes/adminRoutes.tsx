import ManageCategories from "../pages/Dashboard/Dashboard Layout/Admin/ManageCategories";
import ManageProducts from "../pages/Dashboard/Dashboard Layout/Admin/ManageProducts";
import ManageUsers from "../pages/Dashboard/Dashboard Layout/Admin/ManageUsers";

export const adminRoutes =  [
      {
        path: "manage-users",
        element:<ManageUsers/>,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "manage-categories",
        element: <ManageCategories />,
      }
    ]