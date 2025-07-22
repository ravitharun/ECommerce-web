import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Customer/Home.jsx";
import Products from "./Components/Customer/Products.jsx";
import Login from "./Components/Auth/Login";
import Sigin from "./Components/Auth/Sigin.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<Sigin />} />
    </Routes>
  </Router>
);
