import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Location() {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
    postcode: "",
  });

  const [open, setOpen] = useState(false);

  // Fetch current location on load
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
          country: country || "",
          state: state || "",
          city: city || town || village || "",
          postcode: postcode || "",
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

  // Update input
  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };
  const UpdateLocation = async () => {
    let email = localStorage.getItem("email");
    const Location_Data = {
      email: email,
      country: location.country,
      State: location.state,
      City: location.city,
      PostCode: location.postcode,
    };
    const reponse_Location = await axios.post(
      "http://localhost:3000/api/cart/Location/update",
      { LocationData: Location_Data }
    );
    if (reponse_Location.data.message === "Location is Saved") {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-green-100 text-green-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
        >
          <div className="flex-1 w-0">
            <p className="text-sm font-semibold">📍 Location Updated</p>
            <p className="mt-1 text-sm">
              Your location has been successfully saved.
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      ));
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-red-100 text-red-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
        >
          <div className="flex-1 w-0">
            <p className="text-sm font-semibold">⚠️ Location Update Issue</p>
            <p className="mt-1 text-sm">
              {reponse_Location.data.message ||
                "Something went wrong while saving your location."}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      ));
    }

    console.log("updated Location by user", Location_Data);
  };
  return (
    <>
      {/* Location Display Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="w-full border-y border-gray-300 py-3 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm sm:text-base text-gray-700 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              <strong>Country:</strong> {location.country}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span>
              <strong>State:</strong> {location.state}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span>
              <strong>City:</strong> {location.city}
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span>
              <strong>Postcode:</strong> {location.postcode}
            </span>
          </div>
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => setOpen(true)}
          >
            Change
          </button>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      </div>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Update Your Location</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={location.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={location.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={location.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postcode
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={location.postcode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Modal Buttons */}
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

                  UpdateLocation();
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Location;
