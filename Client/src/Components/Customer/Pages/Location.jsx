import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit, FiPlus } from "react-icons/fi";
import { FaExclamationCircle, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

import useLocation from "../CustomerLocation/UserLocation";

// Error alert component
function ErrorAlert({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.(); // call parent close
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md w-full flex items-center justify-between shadow-lg font-medium mt-4">
      <div className="flex items-center gap-2">
        <FaExclamationCircle className="text-red-600" />
        <span>{message}</span>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
      >
        <FaTimes className="hover:text-red-600" />
      </button>
    </div>
  );
}

function Location() {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
    postcode: "",
  });
  const [Loadesr, setloader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("update"); // "update" or "add"
  const [errorMessage, setError] = useState("");

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
      const { latitude: lat, longitude: lon } = position.coords;

      try {
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

        const { city, town, village, state, country, postcode } =
          res.data.address;

        setLocation({
          Country: country || "",
          state: state || "",
          City: city || town || village || "",
          PostCode: postcode || "",
        });

        toast.success("📍 Location fetched successfully!");
      } catch (err) {
        toast.error("❌ Failed to fetch location");
      }
    }

    function showError(error) {
      toast.error("❌ Failed to get location.");
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const UpdateLocation = async () => {
    const email = localStorage.getItem("email");
    const Location_Data = {
      email,
      country: location.country,
      State: location.state,
      City: location.city,
      PostCode: location.postcode,
    };

    const response = await axios.post(
      "http://localhost:3000/api/cart/Location/update",
      { LocationData: Location_Data }
    );

    if (response.data.message === "Location is Saved") {
      toast.success("📍 Location Updated Successfully!");
    } else {
      toast.error("⚠️ Failed to Update Location");
    }
  };

  const Addaddress = async () => {
    try {
      const email = localStorage.getItem("email");
      const Location_Data = {
        email,
        Country: location.country,
        State: location.state,
        City: location.city,
        PostCode: location.postcode,
      };
      setloader(true);
      const response = await axios.post(
        "http://localhost:3000/api/cart/Location/new",
        { UserNewLocationData: Location_Data }
      );
      if (response.data.message === "Location Added") {
        toast.success("✅ New Address Added!");
      } else if (response.data.message === "Only Min 2 Location U Can Add") {
        setError(response.data.message);
        toast.error(`❌ ${response.data.message}`);
      } else {
        toast.error("❌ Failed to Add Address");
      }
    } catch (error) {
      console.log(error.message, "form the new address code ");
    } finally {
      setloader(false);
    }
  };
  const locations = useLocation();

  return (
    <>
      {}

      <div className=" top-0 z-40 bg-white shadow-sm">
        <div className="w-full border-y border-gray-300 py-3 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm sm:text-base text-gray-700 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              <strong>Country:</strong> {location.Country}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span>
              <strong>State:</strong> {location.State}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span>
              <strong>City:</strong> {location.City}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span>
              <strong>Postcode:</strong> {location.PostCode}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
              onClick={() => {
                setMode("update");
                setOpen(true);
              }}
            >
              <FiEdit className="text-base" />
              Change
            </button>
            <button
              className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
              onClick={() => {
                setMode("add");
                setOpen(true);
              }}
            >
              <FaMapMarkerAlt className="text-blue-600" />
              Add Address
            </button>
          </div>
          <Toaster position="bottom-center"reverseOrder={false} />
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <ErrorAlert message={errorMessage} onClose={() => setError("")} />
      )}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4 text-blue-800">
          <FaMapMarkerAlt className="text-blue-600 text-lg" />
          <h2 className="font-semibold text-md">User Location</h2>
        </div>
        {locations.length === 0 ? (
          <div className="text-sm text-gray-600 font-medium">
            No location added.
          </div>
        ) : (
          locations.map((data, index) => (
            <label
              key={index}
              className="flex items-start gap-3 p-4 mb-3 bg-white rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <input
                type="radio"
                name="Location_user"
                className="mt-1 accent-blue-600"
                onClick={() => {
                  setLocation(data);
                  toast.success("Updated the Location ");
                }}
              />

              <div>
                <div className="text-sm text-blue-900 font-semibold mb-1">
                  📍 Location {index + 1}
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Country:</strong> {data.Country}
                  </p>
                  <p>
                    <strong>City:</strong> {data.City}
                  </p>
                  <p>
                    <strong>State:</strong> {data.State}
                  </p>
                  <p>
                    <strong>Post Code:</strong> {data.PostCode}
                  </p>
                </div>
              </div>
            </label>
          ))
        )}
      </div>
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {mode === "update" ? "Update Your Location" : "Add New Address"}
            </h2>

            <div className="space-y-4">
              {["country", "state", "city", "postcode"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={location[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  mode === "update" ? UpdateLocation() : Addaddress();
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                {mode === "update" ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Location;
