import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; // ✅ Logout icon

import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const Navigate = useNavigate("");
  const role = localStorage.getItem("ROLE");

  if (role === "admin") {
    return <AdminNavbar />;
  }

  const Logout = () => {
    let token = localStorage.removeItem("token");
    console.log(token)
    let email = localStorage.removeItem("email");
    let role = localStorage.removeItem("ROLE");
    Navigate("/login");
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">ShopZone</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link to="/">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Home
              </span>
            </Link>
            <Link to="/Products">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Products
              </span>
            </Link>
            <Link to="/contact">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Contact
              </span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer text-xl" />
            <FaShoppingCart className="text-gray-600 hover:text-green-500 cursor-pointer text-xl" />

            {role === "" || role === null ? (
              <Link to="/login">
                <FaUser className="text-gray-600 hover:text-blue-500 cursor-pointer text-xl" />
              </Link>
            ) : (
              <button
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow transition-all"
                onClick={Logout}
              >
                <FiLogOut size={18} />
                Logout
              </button>
            )}

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
              {menuOpen ? (
                <FaTimes
                  className="text-2xl cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                />
              ) : (
                <FaBars
                  className="text-2xl cursor-pointer"
                  onClick={() => setMenuOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-2 shadow-md">
          <Link to="/">
            <span className="block text-gray-700 hover:text-blue-600 cursor-pointer">
              Home
            </span>
          </Link>
          <Link to="/Products">
            <span className="block text-gray-700 hover:text-blue-600 cursor-pointer">
              Products
            </span>
          </Link>
          <Link to="/Contact">
            <span className="block text-gray-700 hover:text-blue-600 cursor-pointer">
              Contact
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
