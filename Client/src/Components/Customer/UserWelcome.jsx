import axios from "axios";
import React, { useEffect, useState } from "react";

function UserWelcome() {
  const [first, setfirst] = useState("");
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const getUserName = async () => {
      const res = await axios.get("/GetWelcomeName/api", {
        params: { EMAIL: userEmail },
      });
      console.log(res.data.message);
      setfirst(res.data.message);
    };
    getUserName();
  }, []);

  return (
    <div className="text-red-300 bg-green-400 p-3 m-3">
      The user name is {first}
    </div>
  );
}

export default UserWelcome;
