import React from "react";

const SpinnerLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 bg-white">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
      <p className="mt-4 text-lg font-medium">
        Loading your shopping experience...
      </p>
    </div>
  );
};

export default SpinnerLoader;
