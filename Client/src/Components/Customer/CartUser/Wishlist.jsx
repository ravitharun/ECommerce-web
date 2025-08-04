import React from "react";
import Navbar from "../Navbar";
import Location from "../Pages/Location";

function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Trendy Sneakers",
      price: "₹3299",
      image: "https://via.placeholder.com/300x300",
    },
    {
      id: 2,
      name: "Noise Cancelling Headphones",
      price: "₹7999",
      image: "https://via.placeholder.com/300x300",
    },
    {
      id: 3,
      name: "Classic Analog Watch",
      price: "₹2199",
      image: "https://via.placeholder.com/300x300",
    },
    {
      id: 4,
      name: "Cotton Hoodie",
      price: "₹1499",
      image: "https://via.placeholder.com/300x300",
    },
  ];

  const getTotal = () => {
    const total = wishlistItems.reduce((acc, item) => {
      const price = parseInt(item.price.replace("₹", ""));
      return acc + price;
    }, 0);
    return total;
  };

  const totalAmount = getTotal();
  const discount = Math.floor(totalAmount * 0.15); // 15% discount
  const finalAmount = totalAmount - discount;

  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>

      {/* Location Info Bar */}
      <Location />

      {/* Wishlist Layout */}
      <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: User Info */}
          <div className="bg-white rounded-xl shadow p-6 col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              👤 User Info
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Name:</strong> Tharun Ravi
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> tharunravi@example.com
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> Andhra Pradesh, 533003
            </p>
            <button>Change The </button>
          </div>

          {/* Center: Wishlist Items */}
          <div className="col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              🛍️ Your Wishlist
            </h2>

            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md flex gap-4 p-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-red-600 font-medium mt-1">{item.price}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700">
                    🛒 Add to Cart
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}

            {wishlistItems.length === 0 && (
              <div className="text-center text-gray-500 text-xl mt-16">
                Your wishlist is empty 😔
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-xl shadow p-6 col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              🧾 Order Summary
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Total MRP:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount (15%):</span>
                <span className="text-green-600">- ₹{discount}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Final Amount:</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>
          <span>know mroe</span>
        </p>
      </div>
    </>
  );
}

export default Wishlist;
