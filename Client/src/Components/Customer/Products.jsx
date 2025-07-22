import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../Customer/Navbar";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const products = [
  {
    id: 1,
    name: "POCO C75 5G (Enchanted Green, 64 GB)",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/4/r/g/-original-imagyptze6jrkfae.jpeg?q=70",
    rating: 4.3,
    reviews: "79,432",
    price: 7699,
    originalPrice: 10999,
    discount: "30% off",
    brand: "POCO",
    features: [
      "4 GB RAM | 64 GB ROM | Expandable Upto 1 TB",
      "50MP Rear Camera | 5MP Front Camera",
      "5160 mAh Battery",
    ],
  },
  {
    id: 2,
    name: "Motorola Edge 50 Fusion (256 GB)",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/g/6/v/-original-imahyhfjz8qmdyfw.jpeg?q=70",
    rating: 4.4,
    reviews: "1,55,283",
    price: 20999,
    originalPrice: 27999,
    discount: "25% off",
    brand: "MOTOROLA",
    features: ["12 GB RAM | 256 GB ROM", "Full HD+ Display", "Turbo Charging"],
  },
];

export default function ProductPage() {
  const [QuerrProduct, setquerryProduct] = useState("phones");
  const [ProductDisplayui, SetDisplayProduct] = useState([]);

  useEffect(() => {
    const get_data = async () => {
      console.log(QuerrProduct);
      const reponse_data = await axios.get(
        `https://dummyjson.com/products/category/fragrances`
      );
      // console.log(reponse_data.data.products, "use");
      SetDisplayProduct(reponse_data.data.products);
    };
    get_data();
  }, []);

  const CheckData = async () => {
    // 'https://dummyjson.com/products/search?q=phone'
    const reponse_data = await axios.get(
      `https://dummyjson.com/products/search?q=${QuerrProduct}`
    );
    if (reponse_data.data.products.length <= 0) {
      toast.error(`No Products Found Related ${QuerrProduct}`);
    } else {
      console.log(reponse_data.data.products);

      SetDisplayProduct(reponse_data.data.products, "QuerrProduct");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={true} />{" "}
      <div className="flex flex-col lg:flex-row p-4 gap-4 bg-gray-100 min-h-screen">
        {/* Sidebar Filters (UI only) */}
        <aside className="lg:w-1/4 w-full bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div>
            <h3 className="font-medium mb-2 text-gray-700">BRAND</h3>
            {["POCO", "MOTOROLA", "Apple", "vivo", "realme"].map((brand) => (
              <label key={brand} className="block mb-2 text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                {brand}
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search + Header */}
          <div className="flex justify-center">
            <div className="flex flex-col w-full max-w-4xl">
              {/* Search Row */}
              <div className="flex flex-row items-center gap-4 mb-6 w-full">
                <input
                  type="text"
                  onChange={(event) => setquerryProduct(event.target.value)}
                  placeholder="Search items..."
                  className="flex-1 border border-gray-300 px-4 py-2 rounded"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      CheckData();
                    }
                  }}
                />
                <button
                  onClick={CheckData}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </div>

              {/* Result Text */}
              <h1 className="text-center text-lg font-bold text-gray-800">
                Showing {ProductDisplayui.length} results for{" "}
                <span className="text-blue-600">{QuerrProduct}</span>
              </h1>
            </div>
          </div>

          {/* Product List */}
          {/* Product List */}
          <div className="space-y-4">
            {ProductDisplayui.map((product) => (
              <div
                key={product.id}
                onClick={()=>toast.success(` The product  id is ${product.id}`)}
                className="relative bg-white flex flex-col sm:flex-row p-4 rounded shadow hover:shadow-md transition"
              >
                {/* 🎯 Discount Badge (Top-Right Corner) */}
                {product.discountPercentage >= 10 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </div>
                )}

                {/* Product Image */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  title={product.title}
                  className="w-32 h-32 object-contain mb-4 sm:mb-0 sm:mr-4"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-blue-600 mb-1">
                    {product.title}
                  </h2>

                  {/* Rating and Brand */}
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    {product.rating && (
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs flex items-center mr-2">
                        {product.rating}
                        <FaStar className="ml-1 text-yellow-300" />
                      </span>
                    )}
                    <span>{product.brand}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.discountPercentage && (
                      <span className="text-green-600 text-sm font-medium">
                        {product.discountPercentage}% off
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
