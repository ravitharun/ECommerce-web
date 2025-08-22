import React, { useRef, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { PlusCircle } from "lucide-react";
import axios from "axios";

function AddProduct() {
  const [isAddingCategory, setnewProductsType] = useState("");
  const [isAddingPoupCategory, PoupnewProductsType] = useState(false);
  const [isadding, Setisadding] = useState(false);

  // adding the item in array
  const [Category, setCategroy] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Beauty",
    "Home & Kitchen",
  ]);
  // getting the value of the input
  const addNow = (value) => {
    setnewProductsType(value);
    console.log(value);
  };
  // adding them get form of input:text
  const AddCategory = (e) => {
    e.preventDefault();
    if (!isAddingPoupCategory) {
      PoupnewProductsType(true);
    }
    Setisadding((prev) => !prev); // toggles between true/false
  };

  const AddgetnewAddingCategory = (e) => {
    e.preventDefault();
    // let check =  ? alert("add some") : null;
    if (isAddingCategory == "") {
      return alert("add some");
    }

    setCategroy([...Category, isAddingCategory]);
    alert("added the new Category");
  };
  // console.log("Category", Category);
const AddProducts=async()=>{
  const response=await axios.post('https://dummyjson.com/products/add')
  console.log(response,'response from the api AddProducts ')
}
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
          <FormField
            label="Product Name"
            type="text"
            placeholder="Enter product name"
          />

          {/* Price */}
          <FormField label="Price (₹)" type="number" placeholder="e.g. 999" />

          {/* Category */}
          <div>
            <Label text="Category" />
            <select className="input">
              <option value="" disabled>
                Select category
              </option>
              {Category.map((data, index) => (
                <option key={index}>{data}</option>
              ))}
            </select>
            <div className="p-4">
              {isadding && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 w-full max-w-md border border-gray-200"
                >
                  <label
                    htmlFor="newCategory"
                    className="text-gray-700 font-medium"
                  >
                    Add New Category
                  </label>
                  <input
                    id="newCategory"
                    type="text"
                    placeholder="Enter category name..."
                    name="AddNewCategory"
                    onChange={(event) => addNow(event.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="submit"
                    onClick={AddgetnewAddingCategory}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Category
                  </button>
                </form>
              )}

              <button
                onClick={AddCategory}
                className={`mt-4 py-2 px-6 rounded-lg shadow-md font-medium transition 
      ${
        isadding
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
              >
                {isadding ? "Close" : "Add Category"}
              </button>
            </div>
          </div>

          {/* Brand */}
          <FormField label="Brand" type="text" placeholder="e.g. Nike, Apple" />

          {/* Stock + Discount */}
          <div className="flex gap-4">
            <FormField label="Stock Qty" type="number" placeholder="e.g. 100" />
            <FormField
              label="Discount (%)"
              type="number"
              placeholder="e.g. 10"
            />
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
            <FormField
              label="Shipping Info"
              type="text"
              placeholder="e.g. Free Shipping"
            />
            <FormField
              label="Tags"
              type="text"
              placeholder="e.g. phone, smart, android"
            />
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

            onClick={AddProducts}
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
    <input type={type} placeholder={placeholder} className="input" />
  </div>
);

// Label with styling
const Label = ({ text }) => (
  <label className="block mb-1 text-sm font-medium text-gray-700">{text}</label>
);

// Add this CSS in your global/tailwind or index.css:
