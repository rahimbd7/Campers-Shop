import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useGetUserByIdQuery } from "../../../redux/features/user/userApis";
import type { RootState } from "../../../redux/store";
import DashboardHeader from "../Dashboard Components/DashboardHeader";

const DashboardLayout = () => {
   const { user } = useAppSelector((state: RootState) => state.auth);
    const { data, isLoading } = useGetUserByIdQuery(user?.id);
    const userData = data?.data || {};
    const userInfo = {
        name: userData.name,
        email: userData.email,
        profile_img: userData.profile_img
    }
  return (
    <div>
      <div className="h-screen flex flex-col">
          <DashboardHeader user={userInfo} />
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
