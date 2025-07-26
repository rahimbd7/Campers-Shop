import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div className="h-screen flex flex-col">
        <div>
          <h1 className="text-3xl py-4 font-bold">Dashboard</h1>
        </div>
        <div className="grid md:flex h-screen">
          <div className="flex ">
            <Sidebar />
          </div>
          <div
            className=" flex-1 "
            style={{
              backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
