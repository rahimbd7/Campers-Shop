import DashboardStatsCard from "../../Dashboard Components/DashboardStatsCard";


const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Overview</h2>
      <DashboardStatsCard title="Total Users" value="100" icon="❤️" />
    </div>
  );
};

export default AdminDashboard;
