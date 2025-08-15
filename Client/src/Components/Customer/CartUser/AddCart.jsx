import React, { useEffect, useState } from "react";
import { FaTrash, FaShoppingCart, FaClosedCaptioning } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import Navbar from "../Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import toast, { Toaster } from "react-hot-toast";
import Location from "../CustomerLocation/UserLocation";

function AddCart() {
  const [cartData, setCartData] = useState([]);
  const [search, setSearch] = useState("");
  const [Isloader, setloader] = useState(false);
  const navigate = useNavigate();

  // get all crt products saved by particular user by email

  useEffect(() => {
    const cart_get = async () => {
      try {
        setloader(true);
        const Email = localStorage.getItem("email");
        const cart_products = await axios.get(
          "http://localhost:3000/api/cart/GetCartprodcuts",
          {
            params: {
              user_Email: Email,
            },
          }
        );
        setCartData(cart_products.data.message);
        // setloader(false);
      } catch (error) {
        console.log("error = ", error.message);
      } finally {
        setloader(false);
      }
    };
    cart_get();
  }, []);
  const total = cartData.map((data) =>
    data.productPrice == undefined
      ? 0
      : data.productPrice * (data.ProductsQuantity || 1)
  );
  const sum = total.reduce((acc, curr) => acc + curr, 0);
  console.log(sum, "totalSum");
  // let sum=0
  const handelRemove = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/cart/ProductDelete",
        {
          params: { ProductId: id },
        }
      );

      if (response.data.message === "Your Product has been deleted") {
        setCartData((prev) => prev.filter((item) => item._id !== id));

        return toast.custom((t) => (
          <div className="max-w-sm w-full bg-white border-l-4 border-red-500 shadow-lg rounded-md pointer-events-auto flex p-4">
            <div className="flex-shrink-0 text-red-500 text-2xl">🗑️</div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-bold text-gray-900">
                Item removed from cart
              </p>
              <p className="mt-1 text-sm text-gray-600">
                You’ve successfully removed the product.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-gray-400 hover:text-gray-700 focus:outline-none text-lg"
              >
                <FaClosedCaptioning />
              </button>
            </div>
          </div>
        ));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(cartData, "cartData");

  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Main Section */}
      <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
        {/* Cart Heading */}
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-6">
          <FaShoppingCart className="text-orange-500" />
          Your Cart
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full sm:w-1/2">
            <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by product name..."
              className="w-full pl-10 pr-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={search}
              onChange={(e) => toast.error("adding soon")}
            />
          </div>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md mb-4 flex items-start space-x-3 animate-fade-in">
          <svg
            className="w-6 h-6 mt-1 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 9v2m0 4h.01M12 18h.01"
            />
          </svg>
          <div>
            <p className="font-semibold">Note</p>
            <p className="text-sm">
              Click on the image to see more details about the product.
            </p>
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-4  py-2 rounded-lg shadow-md inline-flex items-center space-x-2 text-sm font-semibold">
          <span>Total Cart Items:</span>
          <span className="bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full text-xs shadow-inner">
            {cartData.length}
          </span>
        </div>
        <br />
        <br />
        <>
          {/* Product Table */}
          {Isloader ? (
            <SpinnerLoader />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-gray-200 text-left text-sm text-gray-600 uppercase tracking-wider">
                    <th className="px-4 py-3">productImage</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">productDescription</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                {cartData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md shadow-sm text-center border border-dashed border-gray-300">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h18M9 3v1m6-1v1M4 7h16l-1.68 12.09a2 2 0 01-1.98 1.91H7.66a2 2 0 01-1.98-1.91L4 7zm5 4v4m6-4v4"
                      />
                    </svg>
                    <p className="text-lg font-semibold text-gray-700">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-gray-500">
                      Looks like you haven’t added anything yet.
                    </p>
                    <Link to="/Products">
                      <button>Add Products</button>
                    </Link>
                  </div>
                ) : (
                  <tbody>
                    {cartData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition  "
                      >
                        <td className="px-4 py-3">
                          <img
                            src={item.productThumbnail}
                            alt={item.productTitle}
                            className="w-16 h-16 object-contain rounded cursor-pointer"
                            onClick={() =>
                              navigate("/ProductDetails", {
                                state: item.Productid,
                              })
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {item.productTitle}
                        </td>

                        <td className="px-4 py-3 text-sm font-medium">
                          {item.productDescription}
                        </td>
                        <td
                          className="px-4 py-3 text-sm"
                          title={item.productPrice?.toLocaleString()}
                        >
                          ₹{item.productPrice?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-center ">
                          {item.ProductsQuantity == null
                            ? 1
                            : item.ProductsQuantity}
                        </td>

                        <td className="px-4 py-3 text-sm font-semibold">
                          ₹
                          {item.ProductsQuantity == 0
                            ? (
                                item.ProductsQuantity * item.productPrice
                              ).toLocaleString()
                            : item.productPrice?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handelRemove(item._id)}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                          >
                            <FaTrash className="text-sm" /> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          )}

          {/* Total Summary */}
          <div className="mt-6 text-right pr-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Total: ₹{sum.toLocaleString()}
            </h3>
            <button
              onClick={() => alert("Checkout feature coming soon!")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      </div>
    </>
  );
}

export default AddCart;
