import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function CustomAlert() {
  const successMessages = [
    "✅ Item added to cart successfully!",
    "🛍️ Enjoy your shopping journey!",
    "🎉 Thanks for choosing us — happy shopping!",
    "🚚 Order placed successfully!",
    "🌟 Have a great shopping experience!",
  ];
  let randomMessage=''
  while (!randomMessage) {
    randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
    }
  console.log(randomMessage);
  useEffect(() => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-sm w-full bg-white border border-green-500 shadow-xl rounded-2xl p-4 flex items-start gap-4`}
        >
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {randomMessage}
            </p>
          </div>
        </div>
      ),
      { id: "success-toast" }
    );
  }, []);

  return <>  <Toaster position="top-center" reverseOrder={true} /></>;
}

export default CustomAlert;
