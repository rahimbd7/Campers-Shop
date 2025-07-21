import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import  Home from "../pages/Home/Home";
import  AllProducts from "../pages/Products/AllProducts";
import ProductsByCategory from './../pages/Products/ProductsByCategory';
import ProductDetails from "../pages/Products/ProductDetails";
import CartPage from "../pages/Cart/CartPage";
import LoginPage from "../pages/Login/LoginPage";
import Checkout from "../pages/CheckOut/CheckOut";
import ProtectedRoute from "../ProtectedRoute/ProtechtedRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/products",
                element:<AllProducts/>,
            },
            {
                path: "/products_by_category/:id",
                element:<ProductsByCategory/>,
            },
            {
                path:'/product/:productId',
                element:<ProductDetails/>
            },
            {
                path:'/view-all-cart-items',
                element:<CartPage/>
            },
            {
                path:'/login',
                element:<LoginPage/>
            },
            {
                path:'/checkout',
                element:<ProtectedRoute><Checkout/></ProtectedRoute>
            }
        ],
    },
]);
export default routes;