import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useGetUserByIdQuery } from "../../../redux/features/user/userApis";

import DashboardHeader from "../Dashboard Components/DashboardHeader";
import { selectCurrentUser } from "../../../redux/features/auth/authSelector";
import Footer from "../../../components/Footer";

import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const user = currentUser?.user;
  const { data } = useGetUserByIdQuery(user?.id);
  const userData = data?.data || {};
  const userInfo = {
    name: userData.name,
    email: userData.email,
    profile_img: userData.profile_img || userData?.photoURL
  };

  const location = useLocation();

  // Motion variants for page animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <div className="h-screen flex flex-col">
        <DashboardHeader user={userInfo} />
        <div className="grid md:flex">
          <div className="flex md:min-h-screen bg-gray-700">
            <Sidebar />
          </div>

          {/* Animate Outlet content */}
          <div
            className="flex-1 min-h-screen"
            style={{
              backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname} // important to animate on route change
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
