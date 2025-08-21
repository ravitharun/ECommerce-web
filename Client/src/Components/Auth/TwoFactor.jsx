import React, { useRef } from "react";
import toast from "react-hot-toast";

function TwoFactor() {
  const otp = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.current.value === "") {
      toast.error("Please enter the verification code");
      otp.current.focus();
      return;
    }
    console.log("OTP submitted:", otp.current.value);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Please enter the verification code sent to your email.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              ref={otp}
              placeholder="Verification Code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Verify
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Didn't receive the code?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Resend Code
            </a>
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center p-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </>
  );
}

export default TwoFactor;
