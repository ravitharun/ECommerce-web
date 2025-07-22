import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
function Sigin() {
  const [role, setRole] = useState("customer");
  const [showPass, setShowPass] = useState(false);

  const FullName = useRef();
  const Email = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const User_info = {
      FullName: FullName.current.value,
      Email: Email.current.value,
      Role: role,
      Password: passwordRef.current.value,
    };
    console.log("User_info:", User_info);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-600">
              Shop<span className="text-gray-800">Zone</span>
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Sign up to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sign in as
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                ref={FullName}
                required
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                ref={Email}
                required
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                ref={passwordRef}
                required
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-1.5 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-8 text-gray-500 hover:text-blue-600"
                tabIndex={-1}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition text-sm">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7..." />
              {/* Add full path if using real Google logo */}
            </svg>
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/login">
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Login
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Sigin;
