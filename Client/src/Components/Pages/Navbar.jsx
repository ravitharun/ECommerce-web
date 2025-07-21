import React, { useState } from 'react';
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import AdminNavbar from './AdminNavbar';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // You can dynamically set this based on login/auth role
  const role = 'admin'; // or 'customer'

  if (role === 'admin') {
    return <AdminNavbar />;
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">ShopZone</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 font-medium">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer text-xl" />
            <FaShoppingCart className="text-gray-600 hover:text-green-500 cursor-pointer text-xl" />
            <FaUser className="text-gray-600 hover:text-blue-500 cursor-pointer text-xl" />
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
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Products
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Categories
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
