import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import { a } from "react-router-dom";
const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">Admin Panel</div>

        {/* Desktop as */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center cursor-pointer">
          <li>
            <Link 
              to="/admin"
              className="hover:text-red-400 flex items-center gap-1"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="hover:text-red-400 flex items-center gap-1"
            >
              <FaBoxOpen /> Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="hover:text-red-400 flex items-center gap-1"
            >
              <FaShoppingCart /> Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="hover:text-red-400 flex items-center gap-1"
            >
              <FaUsers /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add-product"
              className="hover:text-red-400 flex items-center gap-1"
            >
              <FaPlus /> Add Product
            </Link>
          </li>
        </ul>

        {/* Logout button (desktop) */}
        <button
          onClick={handleLogout}
          className="hidden md:flex bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm items-center gap-1"
        >
          <FaSignOutAlt /> Logout
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden mt-4 space-y-3 text-sm font-medium">
          <li>
            <a
              to="/admin/dashboard"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTachometerAlt /> Dashboard
            </a>
          </li>
          <li>
            <a
              to="/admin/products"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaBoxOpen /> Products
            </a>
          </li>
          <li>
            <a
              to="/admin/orders"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaShoppingCart /> Orders
            </a>
          </li>
          <li>
            <a
              to="/admin/users"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUsers /> Users
            </a>
          </li>
          <li>
            <a
              to="/admin/add-product"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaPlus /> Add Product
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default AdminNavbar;
