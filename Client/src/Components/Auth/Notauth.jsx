import React from "react";
import { Link } from "react-router-dom";

function Notauth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-6">
          You are not authorized to access this page. Please login with the correct account.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default Notauth;
