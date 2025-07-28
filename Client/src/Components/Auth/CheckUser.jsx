import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckUser() {
  const navigate = useNavigate("");
  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      console.log("user is auth");
    } else {
      navigate("/login");
    }
  }, []);

  return <></>;
}

export default CheckUser;
