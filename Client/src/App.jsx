import React from "react";
import Navbar from "./Components/Pages/Navbar";
import Login from "./Components/Auth/Login";
import Sigin from "./Components/Auth/Sigin";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Contact from "./Components/Pages/Contact";
import Home from "./Components/Pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Login />
      <Sigin />
      <ForgetPassword />
      <Contact />
      <Home />
    </>
  );
}

export default App;
