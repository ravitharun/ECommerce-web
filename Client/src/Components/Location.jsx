import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  return (
    <>
      {/* Location Display Bar */}
   <div className="sticky top-0 z-40 bg-white shadow-sm">
  <div className="w-full border-y border-gray-300 py-3 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm sm:text-base text-gray-700 gap-2">
    <div className="flex flex-wrap items-center gap-2">
      <span><strong>Country:</strong> {location.country}</span>
      <span className="mx-2 hidden sm:inline">|</span>
      <span><strong>State:</strong> {location.state}</span>
      <span className="mx-2 hidden sm:inline">|</span>
      <span><strong>City:</strong> {location.city}</span>
      <span className="mx-2 hidden sm:inline">|</span>
      <span><strong>Postcode:</strong> {location.postcode}</span>
    </div>
    <button
      className="text-blue-600 hover:underline font-medium"
      onClick={() => setOpen(true)}
    >
      Change
    </button>
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
                  toast.success("✅ Location updated!");
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
