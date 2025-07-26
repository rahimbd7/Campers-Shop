import React from "react";

interface DashboardPageWrapperProps {
  title?: string;
  children: React.ReactNode;
}

const DashboardPageWrapper: React.FC<DashboardPageWrapperProps> = ({ title, children }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      {title && (
        <h1 className="text-2xl font-bold text-white mb-4">
          {title}
        </h1>
      )}

      {/* Page Content */}
      <div className="bg-base-200 rounded-lg shadow p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardPageWrapper;
