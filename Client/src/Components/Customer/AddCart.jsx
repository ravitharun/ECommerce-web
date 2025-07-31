import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Wait from "../Wait";
const initialCartData = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 8999,
    quantity: 1,
    image:
      "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/20c80a2a-3913-48c5-bdf2-6e3481047abf/air-max-270-mens-shoes-KkLcGR.png",
  },
  {
    id: 2,
    name: "Apple AirPods Pro",
    price: 24999,
    quantity: 2,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2nd-gen-2023?wid=600&hei=600&fmt=jpeg&qlt=95&.v=1694014871981",
  },
];

function AddCart() {
  const [cartData, setCartData] = useState(initialCartData);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleRemove = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    setCartData(updatedCart);
  };

  const filteredCart = cartData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>

      <div className="bg-orange-600 text-white text-center py-4 font-mono text-sm sm:text-base">
        🛠️ Add to Cart is being updated – Available in 2 hours!
      </div>

      <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          🛒 Your Cart
        </h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by product name..."
            className="w-full sm:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredCart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4072/4072301.png"
              alt="No items"
              className="w-32 h-32 mb-4 opacity-80"
            />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              No items match your search 🧐
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Looks like your cart is empty or the product you're searching for
              isn't available.
            </p>
          
            <button
              onClick={() => navigate("/Products")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200 text-left text-sm text-gray-600 uppercase tracking-wider">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-sm">
                      ₹{item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AddCart;
