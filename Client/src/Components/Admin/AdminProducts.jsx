import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import ReactPaginate from "react-paginate";

export default function AdminProducts() {
  const productsPerPage = 5; // You can change this number
  const sampleProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "₹2,499",
      stock: 34,
      sku: "WH-2345",
      image:
        "https://cdn.pixabay.com/photo/2020/03/06/17/44/headphones-4906901_1280.jpg",
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Footwear",
      price: "₹3,199",
      stock: 12,
      sku: "RS-9812",
      image:
        "https://cdn.pixabay.com/photo/2016/11/21/12/20/shoes-1840618_1280.jpg",
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: "₹4,999",
      stock: 0,
      sku: "SW-8888",
      image:
        "https://cdn.pixabay.com/photo/2017/03/14/12/39/apple-2131902_1280.jpg",
    },
    {
      id: 4,
      name: "Casual T-Shirt",
      category: "Clothing",
      price: "₹999",
      stock: 45,
      sku: "TS-1212",
      image:
        "https://cdn.pixabay.com/photo/2016/03/26/13/09/t-shirt-1280275_1280.jpg",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "₹1,999",
      stock: 15,
      sku: "BS-1010",
      image:
        "https://cdn.pixabay.com/photo/2017/03/10/00/02/music-2137444_1280.jpg",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * productsPerPage;
  const currentItems = sampleProducts.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(sampleProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <AdminNavbar />
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">All Products</h2>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by name or SKU"
              className="px-4 py-2 border border-gray-300 rounded w-full sm:w-64"
            />
            <select className="px-4 py-2 border border-gray-300 rounded w-full sm:w-48">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Clothing">Clothing</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto">
              + Add Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-sm text-gray-600">#</th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  Stock
                </th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  SKU
                </th>
                <th className="text-left px-4 py-3 text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{offset + index + 1}</td>
                  <td className="px-4 py-3 text-sm flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.category}</td>
                  <td className="px-4 py-3 text-sm">{product.price}</td>
                  <td className="px-4 py-3 text-sm">{product.stock}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.sku}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< Prev"
            containerClassName="flex items-center gap-2 text-sm"
            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
            nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
            breakClassName="px-2"
          />
        </div>
      </div>
    </>
  );
}
