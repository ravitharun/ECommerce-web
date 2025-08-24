import React, { useRef, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { PlusCircle } from "lucide-react";
import axios from "axios";

function AddProduct() {
  const [isAddingCategory, setNewCategory] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Beauty",
    "Home & Kitchen",
  ]);

  // refs
  const title = useRef("");
  const price = useRef("");
  const brand = useRef("");
  const stock = useRef("");
  const discountPercentage = useRef("");
  const rating = useRef("");
  const sku = useRef("");
  const weight = useRef("");
  const width = useRef("");
  const height = useRef("");
  const depth = useRef("");
  const warrantyInformation = useRef("");
  const shippingInformation = useRef("");
  const availabilityStatus = useRef("");
  const returnPolicy = useRef("");
  const minimumOrderQuantity = useRef("");
  const tags = useRef("");
  const description = useRef("");
  const highlights = useRef("");
  const images = useRef("");
  const thumbnail = useRef("");

  // add category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!isAddingCategory.trim()) {
      return alert("Please enter a category name");
    }
    setCategories([...categories, isAddingCategory]);
    setNewCategory("");
    alert("Category added successfully");
  };

  // submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      title: title.current.value,
      description: description.current.value,
      category: categories[0], // just taking first for now, can bind selected
      price: parseFloat(price.current.value),
      discountPercentage: parseFloat(discountPercentage.current.value),
      rating: parseFloat(rating.current.value),
      stock: parseInt(stock.current.value),
      tags: tags.current.value.split(",").map((tag) => tag.trim()),
      brand: brand.current.value,
      sku: sku.current.value,
      weight: parseFloat(weight.current.value),
      dimensions: {
        width: parseFloat(width.current.value),
        height: parseFloat(height.current.value),
        depth: parseFloat(depth.current.value),
      },
      warrantyInformation: warrantyInformation.current.value,
      shippingInformation: shippingInformation.current.value,
      availabilityStatus: availabilityStatus.current.value,
      returnPolicy: returnPolicy.current.value,
      minimumOrderQuantity: parseInt(minimumOrderQuantity.current.value),
      images: [images.current.value],
      thumbnail: thumbnail.current.value,
    };
    console.log(newProduct);

    try {
      const response = await axios.post(
        "https://dummyjson.com/products/add",
        newProduct,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data, "Product added!");
    } catch (error) {
      console.log(error);
    }
  };

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

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Product Name */}
          <InputField label="Product Name" type="text" refField={title} />

          {/* Price + Discount + Rating */}
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Price (₹)" type="number" refField={price} />
            <InputField
              label="Discount (%)"
              type="number"
              refField={discountPercentage}
            />
            <InputField label="Rating" type="number" refField={rating} />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>
            <select className="input">
              <option value="" disabled>
                Select category
              </option>
              {categories.map((data, index) => (
                <option key={index}>{data}</option>
              ))}
            </select>

            {showCategoryForm && (
              <form
                onSubmit={handleAddCategory}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 mt-3 border border-gray-200"
              >
                <input
                  type="text"
                  placeholder="Enter category name..."
                  value={isAddingCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Add Category
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className={`mt-4 py-2 px-6 rounded-lg shadow-md font-medium transition 
                ${
                  showCategoryForm
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
            >
              {showCategoryForm ? "Close" : "Add Category"}
            </button>
          </div>

          {/* Brand + SKU + Stock */}
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Brand" type="text" refField={brand} />
            <InputField label="SKU Code" type="text" refField={sku} />
            <InputField label="Stock Qty" type="number" refField={stock} />
          </div>

          {/* Weight + Min Order Qty */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Weight (kg)" type="number" refField={weight} />
            <InputField
              label="Min Order Qty"
              type="number"
              refField={minimumOrderQuantity}
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Dimensions
            </label>
            <div className="grid grid-cols-3 gap-4">
              <InputField label="Width" type="number" refField={width} />
              <InputField label="Height" type="number" refField={height} />
              <InputField label="Depth" type="number" refField={depth} />
            </div>
          </div>

          {/* Warranty + Shipping + Availability */}
          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Warranty Information"
              type="text"
              refField={warrantyInformation}
            />
            <InputField
              label="Shipping Info"
              type="text"
              refField={shippingInformation}
            />
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Availability
              </label>
              <select className="input" ref={availabilityStatus}>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Return Policy */}
          <InputField
            label="Return Policy"
            type="text"
            refField={returnPolicy}
          />

          {/* Tags */}
          <InputField
            label="Tags (comma separated)"
            type="text"
            refField={tags}
          />

          {/* Description */}
          <TextAreaField
            label="Description"
            rows={3}
            placeholder="Write product description..."
            refField={description}
          />

          {/* Highlights */}
          <TextAreaField
            label="Highlights"
            rows={2}
            placeholder="e.g. Waterproof, 1-year warranty"
            refField={highlights}
          />

          {/* Product Images */}
          <InputField
            label="Image URL"
            type="text"
            refField={images}
            placeholder="Paste image URL"
          />

          {/* Thumbnail */}
          <InputField
            label="Thumbnail URL"
            type="text"
            refField={thumbnail}
            placeholder="Paste thumbnail URL"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;

// ✅ Reusable InputField
const InputField = ({ label, type, refField, placeholder }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      ref={refField}
      placeholder={placeholder}
      className="input"
    />
  </div>
);

// ✅ Reusable TextAreaField
const TextAreaField = ({ label, rows, refField, placeholder }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      rows={rows}
      ref={refField}
      placeholder={placeholder}
      className="input resize-none"
    ></textarea>
  </div>
);
