import CartPage from "../pages/Cart/CartPage";
import Checkout from "../pages/CheckOut/CheckOut";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Login/LoginPage";
import AllProducts from "../pages/Products/AllProducts";
import ProductDetails from "../pages/Products/ProductDetails";
import ProductsByCategory from "../pages/Products/ProductsByCategory";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export const publicRoutes =  [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products_by_category/:id",
        element: <ProductsByCategory />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/view-all-cart-items",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute >
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ]