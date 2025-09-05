
import {  ShoppingBasket } from "lucide-react";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useGetUserOrdersQuery } from "../../../../redux/features/Order/orderApi";
import { useAppSelector } from "../../../../redux/hooks";

import DashboardStatsCard from "../../Dashboard Components/DashboardStatsCard";
import { selectCurrentUser } from "../../../../redux/features/auth/authSelector";

const UserDashboard = () => {
 const currentUser = useAppSelector(selectCurrentUser);
    const user = currentUser?.user;
    const { data, isLoading } = useGetUserOrdersQuery(user?.id);
    if (isLoading) return <LoadingSpinner message="Dashboard is loading..." />;
  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">User Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardStatsCard title="Your Total Purchases" value={data?.data?.length || 0} icon={<ShoppingBasket size={34} />} />

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


