type Props = {
  title: string;
  value: string | number;
  icon: string;
};

const DashboardStatsCard = ({ title, value, icon }: Props) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition p-4">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
