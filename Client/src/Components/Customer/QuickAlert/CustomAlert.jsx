import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function CustomAlert() {
  const alertPopup = [
    { message: "🔥 Big Sale! Get 50% off on Electronics.", type: "info" },
    { message: "🛒 Don't forget to check your cart!", type: "warn" },
    { message: "🚚 Free delivery on orders above ₹999.", type: "success" },
    { message: "💳 Secure payments with cashback offers.", type: "info" },
    { message: "🎁 Flat ₹200 off on your first order!", type: "success" },
    { message: "⏰ Limited-time deal: 70% off on Fashion.", type: "warn" },
    { message: "⭐ New arrivals just landed in Store!", type: "info" },
    { message: "📦 Track your order in real-time.", type: "info" },
    { message: "💥 Flash Sale ends in 2 hours!", type: "warn" },
    { message: "🏷️ Buy 1 Get 1 Free on selected items.", type: "success" },
    { message: "🔒 100% secure checkout guaranteed.", type: "info" },
    { message: "🌍 Now shipping internationally!", type: "success" },
  ];

  useEffect(() => {
    // Show first toast immediately
    let firstIndex = Math.floor(Math.random() * alertPopup.length);
    toast(alertPopup[firstIndex].message);

    // Set interval for every 1 min
    const intervalId = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * alertPopup.length);
      let { message, type } = alertPopup[randomIndex];

      // pick toast style based on type
      if (type === "success") toast.success(message);
      else if (type === "warn") toast.error(message);
      else toast(message); // default info
    }, 60000); // 1 minute interval

    // cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return <Toaster position="top-center" reverseOrder={true} />;
}

export default CustomAlert;
