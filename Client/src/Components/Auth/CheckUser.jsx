import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckUser() {
  const navigate = useNavigate("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const checkProfile = async () => {
      let token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Welcome, ${data.user.email}`);
      } else {
        setMessage(data.message);
        navigate("/login");
      }
    };
    checkProfile();
  }, []);

  return <></>;
}

export default CheckUser;
