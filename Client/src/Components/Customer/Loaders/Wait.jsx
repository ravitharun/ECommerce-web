import React from "react";

function Wait() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
      <div className="w-14 h-14 border-4 border-dashed border-red-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-semibold tracking-wide">
        Adding item to cart... please wait 🛒
      </p>
      <p className="text-sm text-gray-500 mt-1">We're processing your request.</p>
    </div>
  );
}

export default Wait;
