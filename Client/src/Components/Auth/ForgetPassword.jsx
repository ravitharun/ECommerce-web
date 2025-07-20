import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const emailRef = useRef();
  const [isSending, setIsSending] = useState(true);

  const handleForgetPassword = async () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    try {
      setIsSending(true);
      const res = await axios.post("http://localhost:3000/api/ForgotPassword", {
        email,
      });
      toast.success("Password reset link sent to your email.");
      console.log(res.data.message);
      emailRef.current.value("");
    } catch (error) {
      toast.error("Failed to send reset email.");
      console.log(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Forgot Password
        </h2>

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          onKeyDown={(e) => e.key === "Enter" && handleForgetPassword()}
        />

        <button
          onClick={handleForgetPassword}
          disabled={isSending}
          className={`w-full py-2 rounded-md text-white font-semibold transition duration-200 ${
            isSending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSending ? (
            <button
              disabled
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              <span className="inline-block animate-bounce">Sending...</span>
            </button>
          ) : (
            "Send Reset Link"
          )}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Enter your registered email address to receive a reset link.
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
