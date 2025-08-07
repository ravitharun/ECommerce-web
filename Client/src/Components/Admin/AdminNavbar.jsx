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
  FaUserCircle,
  FaUserCog,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">Admin Panel</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center cursor-pointer">
          <li>
            <Link to="/admin" className="hover:text-red-400 flex items-center gap-1">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="hover:text-red-400 flex items-center gap-1">
              <FaBoxOpen /> Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="hover:text-red-400 flex items-center gap-1">
              <FaShoppingCart /> Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-red-400 flex items-center gap-1">
              <FaUsers /> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/add-product" className="hover:text-red-400 flex items-center gap-1">
              <FaPlus /> Add Product
            </Link>
          </li>
        </ul>

        {/* Profile Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 hover:text-red-400 focus:outline-none"
          >
            <FaUserCircle className="text-xl" />
            <span className="text-sm">Admin</span>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-md z-50">
              <Link
                to="/admin/profile"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <FaUserCog /> Profile
              </Link>
              <Link
                to="/admin/settings"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                ⚙️ Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
            <Link
              to="/admin"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaBoxOpen /> Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaShoppingCart /> Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUsers /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add-product"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaPlus /> Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUserCog /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="flex items-center gap-2 hover:text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ⚙️ Settings
            </Link>
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
