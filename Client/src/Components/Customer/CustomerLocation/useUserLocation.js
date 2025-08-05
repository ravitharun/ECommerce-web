// src/hooks/useUserLocation.js

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useUserLocation(autoFetch=true) {
  const [locationData, setLocationData] = useState({
    country: "",
    state: "",
    city: "",
    postcode: "",
  });

  const getLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("❌ Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
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

          const data = {
            country: country || "",
            state: state || "",
            city: city || town || village || "",
            postcode: postcode || "",
          };

          setLocationData(data);
        
          toast.success("📍 Location fetched successfully!");
        } catch (err) {
          toast.error("❌ Failed to fetch location");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error(
            "📍 Location access denied. Please allow location permission from your browser settings and try again."
          );
        } else {
          toast.error("❌ Geolocation error: " + error.message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // autoFetch only if true
  useEffect(() => {
    if (autoFetch) getLocation();
  }, []);

  return { locationData, getLocation };
}
