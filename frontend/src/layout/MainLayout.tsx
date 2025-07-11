import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";



const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>   
        </div>
    );
};

export default MainLayout;