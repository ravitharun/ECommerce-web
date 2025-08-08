import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Products from "./Components/Customer/Pages/Products.jsx";
import Login from "./Components/Auth/Login";
import Sigin from "./Components/Auth/Sigin.jsx";
import ProductDetails from "./Components/Customer/Pages/ProductDetails.jsx";
import ProtectedRoute from "../src/Components/Auth/ProtectedRoute";
import Notauth from "./Components/Auth/Notauth";
import AddProdcuts from "./Components/Admin/AddProdcuts.jsx";
import AdminProducts from "./Components/Admin/AdminProducts.jsx";
import AddCart from "./Components/Customer/CartUser/AddCart.jsx";
import Wishlist from "./Components/Customer/CartUser/Wishlist.jsx";
import ContactPage from "./Components/Customer/Pages/Contact";
import UserProfile from "./Components/Customer/Profile/UserProfile.jsx";
import UpdatePassword from "./Components/Auth/UpdatePassword.jsx";

const role = localStorage.getItem("ROLE");
const isLoggedIn = !!localStorage.getItem("token");

const user = {
  isLoggedIn: isLoggedIn,
  role: role,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<Sigin />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/not-authorized" element={<Notauth />} />

        {/* ✅ Customer Protected Routes */}
        <Route
          path="/Products"
          element={
            <ProtectedRoute user={user} allowedRoles={["customer"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user} allowedRoles={["customer"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute user={user} allowedRoles={["customer"]}>
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Add/cart"
          element={
            <ProtectedRoute user={user} allowedRoles={["customer"]}>
              <AddCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/wishlist"
          element={
            <ProtectedRoute user={user} allowedRoles={["customer"]}>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProductDetails"
          element={
            <ProtectedRoute user={user} allowedRoles={["customer"]}>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin Protected Routes */}
    
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <AddProdcuts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
