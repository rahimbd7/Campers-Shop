import { useAppSelector } from "../../redux/hooks";
import AdminDashboard from "./Dashboard Layout/Admin/AdminDashboard";
import UserDashboard from "./Dashboard Layout/Users/UserDashboard";

const Dashboard = () => {
  const {user} = useAppSelector((state) => state.auth);
   if(user?.role === "user") {
    return <UserDashboard />;
  } else {
    return <AdminDashboard />;
  }
 
};

export default Dashboard;