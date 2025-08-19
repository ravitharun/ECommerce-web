import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function CheckUser() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [Checkuser, SetcheckUser] = useState(false);
  const alreadyChecked = useRef(false);
  const tokenErrorShown = useRef(false);

  useEffect(() => {
    if (alreadyChecked.current) return;
    alreadyChecked.current = true;

    const checkProfile = async () => {
      try {
        let token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTimeout(() => {
            toast.custom(
              (t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-sm w-full bg-white border border-green-500 shadow-xl rounded-2xl p-4 flex items-start gap-4`}
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {message ?? "✅ Action completed successfully!"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Welcome, {data?.user?.email ?? "Guest"}
                    </p>
                    <p className="text-xs text-gray-600">
                      🎉 Have a great shopping!
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✖
                  </button>
                  
                </div>
              ),
              { id: "success-toast" }
            );
          }, 2000);
          SetcheckUser(true);
        } else if (data.message === "Invalid or expired token") {
          if (!tokenErrorShown.current) {
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-red-600 text-white shadow-lg rounded-xl p-4 flex items-center gap-3`}
              >
                <span className="text-lg">⚠️</span>
                <div className="flex-1">{data.message}</div>
                <button
                  className="ml-2 text-sm bg-white text-red-600 px-2 py-1 rounded-md hover:bg-gray-200"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Close
                </button>
                <button
                  className="ml-2 text-sm bg-white text-red-600 px-2 py-1 rounded-md hover:bg-gray-200"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Login
                </button>
              </div>
            ));
            tokenErrorShown.current = true;
            SetcheckUser(false);
          }
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage(data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error("CheckUser error:", error);
      }
    };

    checkProfile();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}

export default CheckUser;
