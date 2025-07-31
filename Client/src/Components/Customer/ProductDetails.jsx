import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import SpinnerLoader from "../SpinnerLoader";
import Pay from "./Pay";
import CheckUser from "../Auth/CheckUser";
import RelatedProduct from "./RelatedProduct";
import Navbar from "./Navbar";
import { MdLocationPin } from "react-icons/md";

function ProductDetails() {
  const location = useLocation();
  const productId = location.state;
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");
  const [Location, setLocation] = useState("");
  const [catedories, setCategories] = useState("");
  const [Loader, setisloader] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate("");
  useEffect(() => {
    const getProductById = async () => {
      try {
        setisloader(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setCategories(response.data.category);
        setProduct(response.data);
        console.log();
        setImage(response.data.thumbnail);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setisloader(false);
      }
    };

    getProductById();
  }, [productId]);

  // checkQuantity
  const checkQuantity = (qt) => {
    const minQty = product.minimumOrderQuantity || 1;
    console.log(minQty, "minQty");

    if (minQty == qt) {
      toast.success(`✔️ You accepted the minimum order quantity.`);
    } else {
      toast.error(`🚫 You can only order ${product.minimumOrderQuantity}.`);
    }
  };
  const data_product = {
    order_id: product.id,
    order_title: product.title,
    order_amount: product.price,
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }

    async function showPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
            lon,
            format: "json",
          },
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      const address = res.data.address;
      const { city, town, village, state, country } = address;
      const locationName = `${
        city || town || village || "Unknown place"
      }, ${state}, ${country}`;
      setLocation(locationName);

      toast.success("📍 Location fetched successfully!");
    }

    function showError(error) {
      toast.error("❌ Failed to get location.");
      console.log(error);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  // product.title,product.thumbnail,product.price,product.description,product.id

  // add to cart
  const CheckCart = async (
    id,
    productTitle,
    productPrice,
    productDescription,
    productThumbnail
  ) => {
    let email = localStorage.getItem("email");
    const Prodcut_info = {
      id: id,
      productDescription: productDescription,
      productPrice: productThumbnail,
      productThumbnail: productPrice,
      productTitle: productTitle,
      email: email,
    };
    const cart_response = await axios.post(
      "http://localhost:3000/api/cart/add",
      { product: Prodcut_info }
    );
    console.log("cret_Reponse", cart_response.data.message);

    if (cart_response.data.message == "Cart added successfully") {
      toast.success(
        (t) => (
          <div className="flex items-center gap-4 p-2">
            {/* 🖼️ Optional product image or icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="Cart Icon"
              className="w-10 h-10"
            />
            <div className="flex-1">
              <p className="font-semibold text-green-700 text-sm sm:text-base">
                Item successfully added to your cart!
              </p>
              <p className="text-xs text-gray-500">
                You can check your cart anytime from the top right icon.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/Add/cart");
                }}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
              >
                View Cart
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          </div>
        ),
        {
          autoClose: 5000,
          closeButton: false,
          hideProgressBar: false,
          position: "top-center",
          pauseOnHover: true,
          draggable: true,
          style: {
            borderRadius: "12px",
            border: "1px solid #d1fae5",
            backgroundColor: "#f0fdf4",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
          },
        }
      );
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
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
                <Zoom>
                  <img
                    src={image}
                    alt={product.title || "Product Image"}
                    className="w-full object-contain rounded"
                  />
                </Zoom>
              </div>
            </div>{" "}
            <CheckUser></CheckUser>
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
                Min Order: {product.minimumOrderQuantity || "one"}
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
                  onClick={(event) => checkQuantity(event.target.value)}
                >
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
                Stock:{" "}
                {product.stock <= 5 ? (
                  <span className="font-mono text-red-500">
                    Only {product.stock} Left
                  </span>
                ) : (
                  <b className="text-green-500 font-mono">{product.stock}</b>
                )}
              </p>
              <p className="text-sm text-gray-700">
                Shipping: {product.shippingInformation || "Free Shipping"}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() =>
                    CheckCart(
                      product.id,
                      product.title,
                      product.thumbnail,
                      product.description,
                      product.price
                    )
                  }
                >
                  Add to Cart
                </button>

                {/* </> */}
                <Pay order_id={data_product} />

                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                  Wishlist
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 p-6 mt-6 rounded-lg bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 h-auto md:h-40">
                <button
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 hover:scale-105 transition-all duration-300"
                  onClick={getLocation}
                >
                  <MdLocationPin className="text-red-500 text-2xl" />
                  Get Delivery Location
                </button>
                {Location && (
                  <p className="text-gray-700 font-medium text-center md:text-left">
                    📍 {Location}
                  </p>
                )}
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
      <RelatedProduct Products={catedories} />
    </>
  );
}
export default ProductDetails;
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// function LocationFinder() {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [userLocation, setUserLocation] = useState("");

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const showPosition = async (position) => {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     setLatitude(lat);
//     setLongitude(lon);
//     toast.success("📍 Location fetched successfully!");

//     try {
//       const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
//         params: {
//           lat,
//           lon,
//           format: "json",
//         },
//         headers: {
//           "Accept-Language": "en",
//         },
//       });

//       const address = res.data.address;
//       const { city, town, village, state, country } = address;
//       const locationName = `${city || town || village || "Unknown place"}, ${state}, ${country}`;
//       setUserLocation(locationName);
//     } catch (err) {
//       console.error("Reverse geocoding failed:", err);
//       setUserLocation("Unable to fetch location details");
//     }
//   };

//   const showError = (error) => {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         toast.error("User denied the request for Geolocation.");
//         break;
//       case error.POSITION_UNAVAILABLE:
//         toast.error("Location information is unavailable.");
//         break;
//       case error.TIMEOUT:
//         toast.error("The request to get user location timed out.");
//         break;
//       case error.UNKNOWN_ERROR:
//         toast.error("An unknown error occurred.");
//         break;
//       default:
//         toast.error("Something went wrong.");
//     }
//   };

//   return (
//     <div className="border-2 border-dashed border-gray-300 p-8 text-center text-gray-700 font-sans mt-6 rounded-xl max-w-xl mx-auto shadow">
//       <button
//         onClick={getLocation}
//         className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 hover:scale-105 transition-all duration-300 mx-auto"
//       >
//         <span className="text-lg">📍</span> Get Delivery Location
//       </button>

//       {latitude && longitude && (
//         <div className="mt-6 text-left text-sm text-gray-800">
//           <p><strong>Latitude:</strong> {latitude}</p>
//           <p><strong>Longitude:</strong> {longitude}</p>
//           <p className="mt-2"><strong>Location:</strong> {userLocation}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LocationFinder;
