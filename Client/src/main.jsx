import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Customer/Home.jsx";
import Products from "./Components/Customer/Products.jsx";
import Login from "./Components/Auth/Login";
import Sigin from "./Components/Auth/Sigin.jsx";
import ProductDetails from "./Components/Customer/ProductDetails.jsx";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import App from "./App.jsx"; // ✅ Correct default import
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Notauth from "./Components/Customer/Notauth.jsx";
import AddProdcuts from "./Components/Admin/AddProdcuts.jsx";
import AdminProducts from "./Components/Admin/AdminProducts.jsx";
const role = localStorage.getItem("ROLE");
const isLoggedIn = !!localStorage.getItem("token"); // or whatever you store

const user = {
  isLoggedIn: isLoggedIn,
  role: role,
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/ProductDetails" element={<ProductDetails />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/SignUp" element={<Sigin />} />
        <Route path="/not-authorized" element={<Notauth />} />
        <Route path="/admin/add-product" element={<AddProdcuts />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        {/* Protected route only for customer */}
        <Route
          path="/Products"
          element={
            <ProtectedRoute user={user}>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Products"
          element={
            <ProtectedRoute user={user}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProductDetails"
          element={
            <ProtectedRoute user={user}>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
