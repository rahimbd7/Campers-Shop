import MyCart from "../pages/Dashboard/Dashboard Layout/Users/MyCart";
import MyOrder from "../pages/Dashboard/Dashboard Layout/Users/MyOrder";
import UpdateProfile from "../pages/Dashboard/Dashboard Layout/Users/UpdateProfile";

export const userRoutes = [
  {
    path: "my-orders",
    element: <MyOrder />,
  },
  {
    path: "my-cart",
    element: <MyCart />,
  },
  {
    path: "update-profile",
    element: < UpdateProfile/>,
  },
]
