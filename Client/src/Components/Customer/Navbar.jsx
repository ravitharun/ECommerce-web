import React, { useState, useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Navigate = useNavigate();
  const role = localStorage.getItem("ROLE");
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (role === "admin") {
    return <AdminNavbar />;
  }

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("ROLE");
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

          {/* Icons & Profile Dropdown */}
          <div className="flex items-center space-x-4">
            <Link to="/user/wishlist">
              <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer text-xl" />
            </Link>
            <Link to="/Add/cart">
              <FaShoppingCart className="text-gray-600 hover:text-green-500 cursor-pointer text-xl" />
            </Link>

            {/* Profile Dropdown */}
            {role ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 cursor-pointer text-gray-700"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser className="text-lg sm:text-xl" title="Profile" />
                  <span className="text-sm sm:text-base font-medium hidden xs:inline">
                    Profile
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                    >
                      <MdAccountCircle className="mr-2 text-blue-500" /> My
                      Profile
                    </Link>
                    <Link
                      to="/Add/cart"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                    >
                      <FaShoppingCart className="mr-2 text-green-500" /> Cart
                    </Link>
                    <Link
                      to="/user/wishlist"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                    >
                      <FaHeart className="mr-2 text-pink-500" /> Wishlist
                    </Link>
                    <button
                      onClick={Logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <FaUser className="text-gray-600 hover:text-blue-500 cursor-pointer text-xl" />
              </Link>
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
