import React from "react";

function Marquee() {
  const items = [
    "🔥 50% OFF on Electronics",
    "🚚 Free Shipping Over ₹999",
    "🎁 Buy 1 Get 1 Free – Today Only!",
    "💳 Easy EMI Options Available",
    "🛒 Trending: Smart Watches, Headphones, and More!",
  ];

  return (
    <>
      {/* Inline keyframes for marquee animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .marquee {
            animation: marquee 25s linear infinite;
          }
          .marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="w-full bg-transparent overflow-hidden border-y border-gray-300">
        <div className="flex whitespace-nowrap marquee">
          {items.concat(items).map((item, index) => (
            <span
              key={index}
              className="text-sm md:text-base text-gray-800 font-medium px-6 py-3 inline-block"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Marquee;
