import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import SpinnerLoader from "../SpinnerLoader";

function ProductDetails() {
  const location = useLocation();
  const productId = location.state;
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");
  const [Loader, setisloader] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const getProductById = async () => {
      try {
        setisloader(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(response.data);
        setImage(response.data.thumbnail); // Set default main image
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setisloader(false);
      }
    };

    getProductById();
  }, [productId]);

  return (
    <>
      {Loader ? (
        <SpinnerLoader />
      ) : (
        <div className="p-6 max-w-6xl mx-auto">
          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Images */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {product.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setImage(img)}
                    alt={`thumb-${index}`}
                    className={`w-20 h-20 object-cover rounded border cursor-pointer hover:scale-105 transition ${
                      image === img ? "ring-2 ring-indigo-500" : ""
                    }`}
                  />
                ))}
              </div>
              <div className="w-full max-w-md mx-auto p-4">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.title || "Product Image",
                      isFluidWidth: true,
                      src: image, // ✅ Use selected image
                    },
                    largeImage: {
                      src: image,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerStyle: {
                      background: "#fff",
                      zIndex: 1000,
                      border: "1px solid #ddd",
                      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                    },
                    enlargedImageContainerDimensions: {
                      width: "200%",
                      height: "100%",
                    },
                    lensStyle: {
                      backgroundColor: "rgba(0,0,0,.1)",
                      border: "1px solid #ccc",
                    },
                  }}
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-xl font-semibold text-green-600">
                ₹{product.price}
              </p>
              <p className="text-sm text-gray-500">
                {product.discountPercentage}% off
              </p>
              <p className="text-sm text-gray-700">Rating: {product.rating}</p>
              <p className="text-sm text-gray-700">
                Min Order: {product.minimumOrderQuantity || "1"}
              </p>

              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Select Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  className="w-full px-4 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(event) => console.log(event.target.value)}
                >
                  <option value="" disabled selected>
                    Select one
                  </option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-sm text-gray-700">
                Warranty: {product.warrantyInformation || "1 year standard"}
              </p>
              <p className="text-sm text-gray-700">
                stock: {product.stock <=5?<div className="font-mono text-red-500">Only {product.stock}Left</div>:<b className="text-green-500 font-mono">{product.stock}</b>}
              </p>
              <p className="text-sm text-gray-700">
                Shipping: {product.shippingInformation || "Free Shipping"}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Buy Now
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                  Wishlist
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 p-5 text-center text-gray-600 font-mono mt-6">
                <p>📍 Location features coming soon</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="border p-4 rounded shadow-sm bg-white"
                  >
                    <div className="flex justify-between">
                      <p className="font-semibold">{review.reviewerName}</p>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      {review.reviewerEmail}
                    </p>
                    <p className="mt-2">{review.comment}</p>
                    <p className="text-sm text-yellow-600">
                      ⭐ {review.rating} / 5
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No comments found.</p>
            )}

            {/* Add Comment Form */}
            <form
              className="mt-6 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Comment added: " + comment);
                setComment("");
              }}
            >
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded px-4 py-2"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
