import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  desc?: string;
  icon?: React.ReactNode;
  iconColor?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  desc,
  icon,
  iconColor = "text-secondary",
}) => {
  return (
    <div className="stat">
      <div className={`stat-figure ${iconColor}`}>{icon}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
};

export default StatsCard;
