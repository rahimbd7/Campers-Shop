type Props = {
  title: string;
  value: string | number;
  icon: string | React.ReactNode;
};

const DashboardStatsCard = ({ title, value, icon }: Props) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition p-4">
      <div className="flex items-center gap-4">
        <div className="text-3xl text-[#605DFF]">{icon}</div>
        <div>
          <p className="text-md text-gray-500 font-bold">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
