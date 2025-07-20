import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";



const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>  
            <ToastContainer/> 
            <Footer/>
        </div>
    );
};

export default MainLayout;