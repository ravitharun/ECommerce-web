import { useState, useEffect } from "react";
import axios from "axios";
import UserEmail from "../Getemail";

const useLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const GetLocation = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cart/Get/Location", {
          params: { UserEmail },
        });
        setLocations(response.data.message); // Assuming response.data.message is an array
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    GetLocation();
  }, []);

  return locations;
};

export default useLocation;
