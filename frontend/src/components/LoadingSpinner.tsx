import React from "react";

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px] w-full">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-3 text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
