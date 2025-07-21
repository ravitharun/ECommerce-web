import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Home() {
  const [categories, setCategories] = useState({});
  const scrollRef = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const categoryData = {
      genral: [
        { name: "Groceries", img: "https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100" },
        { name: "fragrances", img: "https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100" },
        { name: "furniture", img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100" },
        { name: "home-decoration", img: "https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100" },
        { name: "kitchen-accessories", img: "https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100" },
        { name: "laptops", img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100" },
        { name: "mobile-accessories", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "Two Wheelers", img: "bike.png" },
        { name: "motorcycle", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "skin-care", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "smartphones", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "sports-accessories", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "sunglasses", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "tablets", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "tops", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "vehicle", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
      ],
      mens: [
        { name: "mens-shirts", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "mens-shoes", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "mens-watches", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
      ],
      womens: [
        { name: "womens-bag", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "womens-dresses", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "womens-jewellery", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "womens-shoes", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
        { name: "womens-watches", img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
      ],
    };

    setCategories(categoryData);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-4 py-6 bg-gray-50 relative">
        <h1 className="text-2xl font-bold text-center mb-6">
          🗂️ Shop by Categories
        </h1>

        {/* Arrows */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:scale-105"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:scale-105"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={20} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide px-10 py-2 border-2 relative z-10"
        >
          {/* Mens */}
          <div
            className="relative min-w-[90px]"
            onMouseEnter={() => setOpen("mens")}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/64/4140/4140048.png"
                alt="Mens"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm mt-2 font-medium text-center">Mens</p>
            </div>

            {/* Dropdown */}
            {open === "mens" && (
              <div className="absolute top-0 left-full ml-2 z-50 bg-white shadow-lg rounded-md p-3 w-44">
                {categories.mens?.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                  >
                    <img src={data.img} alt={data.name} className="w-6 h-6" />
                    <p className="text-sm">{data.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Womens */}
          <div
            className="relative min-w-[90px]"
            onMouseEnter={() => setOpen("womens")}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/64/4140/4140051.png"
                alt="Womens"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm mt-2 font-medium text-center">Womens</p>
            </div>

            {/* Dropdown */}
            {open === "womens" && (
              <div className="absolute top-0 left-full ml-2 z-50 bg-white shadow-lg rounded-md p-3 w-44">
                {categories.womens?.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                  >
                    <img src={data.img} alt={data.name} className="w-6 h-6" />
                    <p className="text-sm">{data.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* General Categories */}
          {categories.genral?.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[90px] hover:scale-105 transition-transform"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm mt-2 font-medium text-center whitespace-nowrap">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
