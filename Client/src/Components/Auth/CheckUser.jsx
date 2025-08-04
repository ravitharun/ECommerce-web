import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function CheckUser() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
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
          setMessage(`Welcome, ${data.user.email}`);
        } else if (data.message === "Invalid or expired token") {
          if (!tokenErrorShown.current) {
            toast.error(data.message, { duration: 3000 });
            tokenErrorShown.current = true;
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

  return <Toaster position="bottom-center" reverseOrder={false} />;
}

export default CheckUser;
