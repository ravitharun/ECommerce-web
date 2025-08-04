import React, { useState, useEffect } from "react";
import Home from "../src/Components/Customer/Pages/Home";
import Dashboard from "./Components/Admin/Dashboard";
import CheckUser from "./Components/Auth/CheckUser";

function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("ROLE");
    setRole(storedRole);
  }, []);

  return (
    <>
      <CheckUser />
      {role === "admin" ? <Dashboard /> : <Home />}
    </>
  );
}

export default App;
