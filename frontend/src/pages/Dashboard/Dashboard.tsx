import { useAppSelector } from "../../redux/hooks";
import AdminDashboard from "./Dashboard Layout/Admin/AdminDashboard";
import UserDashboard from "./Dashboard Layout/Users/UserDashboard";

const Dashboard = () => {
 const backendUser = useAppSelector((state) => state.auth.backendUser);
 const firebaseUser = useAppSelector((state) => state.auth.firebaseUser);
  const user = backendUser || firebaseUser;
   if(user?.role === "user") {
    return <UserDashboard />;
  } else {
    return <AdminDashboard />;
  }
 
};

export default Dashboard;