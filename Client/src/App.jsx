import React from "react";
import Home from "../src/Components/Customer/Pages/Home";
import Dashboard from "./Components/Admin/Dashboard";
import CheckUser from "./Components/Auth/CheckUser";

function App() {
  let role = localStorage.getItem("ROLE");

  return (
    <>
      <CheckUser />
      {role === "admin" ? <Dashboard /> : <Home />}
    </>
  );
}

export default App;
