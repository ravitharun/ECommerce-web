import axios from "axios";
import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [role, setRole] = useState("customer");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate("");
  console.log(role);
  const Email = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User_info = {
      email: Email.current.value,
      role: role,
      password: passwordRef.current.value,
    };
    if (
      User_info.email == "" ||
      User_info.role == "" ||
      User_info.password == ""
    ) {
      toast.error("fill th required Details");
    } else {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/e-com/login",
          {
            params: User_info,
          }
        );
        console.log(response.data.message);
        if (response.data.fillMessage == "Please fill all required fields") {
          console.log(response.data.fillMessage);
        }
        if (response.data.message == "Login successful") {
          localStorage.setItem("ROLE", response.data.user.role);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1200);
        } else if (response.data.message == "User not found") {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-4 sm:p-6">
          <Toaster position="top-center" reverseOrder={true} />
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-600">
              Shop<span className="text-gray-800">Zone</span>
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Login to your account
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

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                ref={Email}
                // required
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
              Login
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
            <Link to="/SignUp">
              <a className="text-blue-600 hover:underline font-medium">
                Sign Up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
