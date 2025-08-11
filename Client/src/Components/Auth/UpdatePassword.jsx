import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UserEmail from "../Customer/Getemail";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const passwordRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate("");
  const handleForgetPassword = async () => {
    const Password = passwordRef.current.value;
    if (!Password) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    try {
      setIsSending(true);
      console.log(passwordRef.current.value);
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const passowrd = passwordRef.current.value;
      const res = await axios.patch(
        "http://localhost:3000/api/e-com/change-password",
        { useremail: email, userUpdatepassword: passowrd }, // request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token here
          },
        }
      );
      if (
        res.data.message ==
        "hey tr565003@gmail.comyour password has been updated"
      ) {
        toast.success("Password reset link sent to your email.");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
      passwordRef.current.value("");
    } catch (error) {
      toast.error(error.messag);
      // console.log(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Update Password
        </h2>

        <p className="text-xs text-gray-400 text-center mb-2">
          Password must be at least 6 characters long for enhanced security.
        </p>
        <a href=""></a>
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-1">Password</label>
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
        <button
          className={`w-full py-2 px-4 rounded-md mt-4  text-white font-semibold transition-colors duration-200 ${
            isSending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleForgetPassword}
          disabled={isSending}
        >
          {isSending ? (
            <span>
              <svg
                className="inline mr-2 w-4 h-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Updating...
            </span>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
    // </button>
  );
}

export default UpdatePassword;
