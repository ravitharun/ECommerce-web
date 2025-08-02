import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Location() {
  const [Location, setLocation] = useState("");
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

      let address = res.data;
    //   console.log(address,'address')
      const {
        road,
        city,
        town,
        village,
        state,
        country,
        postcode,
        state_district,
        display_name:address.display_name
      } = address.address;
      const locationName = {
        road,
        city,
        town,
        village,
        state,
        country,
        postcode,
        state_district,
        display_name
      };
      setLocation(locationName);
      console.log( "locationName",JSON.stringify(address.display_name, null, 2));
      console.log( "locationName",locationName);
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
  console.log(Location, "Location");
  return (
    <>
      <div className="w-full bg-gray-50 border-t border-b border-gray-200 py-3 px-4 flex items-center justify-between text-sm sm:text-base text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium">Country:</span>
          <span>{Location.country}</span>
          <span className="mx-2">|</span>
          <span className="font-medium">State:</span>
          <span>{Location.state}</span>
          <span className="mx-2">|</span>
          <span className="font-medium">City:</span>
          <span>{Location.city}</span>
          <span className="mx-2">|</span>
          <span className="font-medium">Postcode:</span>
          <span>{Location.postcode}</span>
        </div>
        <button className="text-blue-600 hover:underline font-medium">
          Change
        </button>
      </div>
    </>
  );
}

export default Location;
