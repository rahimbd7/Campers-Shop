import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import  Home from "../pages/Home/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/test",
                element: <Home/>,
            },
        ],
    },
]);
export default routes;