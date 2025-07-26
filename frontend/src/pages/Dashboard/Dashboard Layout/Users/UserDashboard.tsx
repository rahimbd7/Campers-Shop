
import DashboardStatsCard from "../../Dashboard Components/DashboardStatsCard";

const UserDashboard = () => {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">User Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardStatsCard title="Total Users" value="100" icon="❤️" /><DashboardStatsCard title="Total Users" value="100" icon="❤️" />

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
