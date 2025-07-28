import React from "react";
import AdminNavbar from "./AdminNavbar";
import { PlusCircle } from "lucide-react";

function AddProduct() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <AdminNavbar />
      </div>

      <div className="max-w-3xl mx-auto my-12 bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
          <PlusCircle className="text-blue-600" />
          Add New Product
        </h2>

        <form className="space-y-6">
          {/* Product Name */}
          <FormField label="Product Name" type="text" placeholder="Enter product name" />
          
          {/* Price */}
          <FormField label="Price (₹)" type="number" placeholder="e.g. 999" />

          {/* Category */}
          <div>
            <Label text="Category" />
            <select className="input">
              <option value="" disabled>Select category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Beauty</option>
              <option>Home & Kitchen</option>
            </select>
          </div>

          {/* Brand */}
          <FormField label="Brand" type="text" placeholder="e.g. Nike, Apple" />

          {/* Stock + Discount */}
          <div className="flex gap-4">
            <FormField label="Stock Qty" type="number" placeholder="e.g. 100" />
            <FormField label="Discount (%)" type="number" placeholder="e.g. 10" />
          </div>

          {/* SKU + Availability */}
          <div className="flex gap-4">
            <FormField label="SKU Code" type="text" placeholder="e.g. SKU123" />
            <div className="flex-1">
              <Label text="Availability" />
              <select className="input">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Shipping Info + Tags */}
          <div className="flex gap-4">
            <FormField label="Shipping Info" type="text" placeholder="e.g. Free Shipping" />
            <FormField label="Tags" type="text" placeholder="e.g. phone, smart, android" />
          </div>

          {/* Description */}
          <div>
            <Label text="Description" />
            <textarea
              rows="3"
              placeholder="Write product description..."
              className="input resize-none"
            ></textarea>
          </div>

          {/* Highlights */}
          <div>
            <Label text="Highlights" />
            <textarea
              rows="2"
              placeholder="e.g. Waterproof, 1-year warranty"
              className="input resize-none"
            ></textarea>
          </div>

          {/* Product Images */}
          <div>
            <Label text="Product Images" />
            <input type="file" multiple accept="image/*" className="w-full" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;

// Reusable Input Component
const FormField = ({ label, type, placeholder }) => (
  <div className="flex-1">
    <Label text={label} />
    <input
      type={type}
      placeholder={placeholder}
      className="input"
    />
  </div>
);

// Label with styling
const Label = ({ text }) => (
  <label className="block mb-1 text-sm font-medium text-gray-700">{text}</label>
);

// Add this CSS in your global/tailwind or index.css:
