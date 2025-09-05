import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // animates on route change
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
