import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../SpinnerLoader";

function Home() {
  const [categories, setCategories] = useState({});
  const [Deals, BestofDeals] = useState([]);
  const [Dealsoffurniture, BestofDealsoffurniture] = useState([]);
  const scrollRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [Isloadingpage, Setisloadingpage] = useState(false);
  //
  useEffect(() => {
    return () => {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } relative w-full max-w-sm bg-white text-gray-800 px-5 py-4 rounded-xl shadow-xl border border-gray-200`}
        >
          {/* Close button */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg font-semibold"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎉</span>
            <div className="text-base font-semibold">
              Cashback Reward Unlocked!
            </div>
          </div>

          {/* Main Message */}
          <p className="text-sm text-gray-600 mb-3">
            You've just earned{" "}
            <span className="font-bold text-green-600">₹100 cashback</span> on
            your recent order. It'll be added to your wallet after delivery.
          </p>

          {/* Action Button */}
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            View My Wallet <span className="text-lg">⬇️</span>
          </button>
        </div>
      ));
    };
  }, []);

  useEffect(() => {
    const categoryData = {
      genral: [
        {
          name: "Groceries",
          img: "https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100",
        },
        {
          name: "fragrances",
          img: "https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100",
        },
        {
          name: "furniture",
          img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100",
        },
        {
          name: "home-decoration",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100",
        },
        {
          name: "kitchen-accessories",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100",
        },
        {
          name: "laptops",
          img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100",
        },
        {
          name: "mobile-accessories",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        { name: "Two Wheelers", img: "bike.png" },
        {
          name: "motorcycle",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "skin-care",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "smartphones",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "sports-accessories",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "sunglasses",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "tablets",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "tops",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "vehicle",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
      ],
      mens: [
        {
          name: "mens-shirts",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "mens-shoes",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "mens-watches",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
      ],
      womens: [
        {
          name: "womens-bag",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "womens-dresses",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "womens-jewellery",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "womens-shoes",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "womens-watches",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
      ],
    };

    setCategories(categoryData);
  }, []);

  useEffect(() => {
    const best = async () => {
      try {
        Setisloadingpage(true);
        const reponse = await axios.get(
          "https://dummyjson.com/products/category/laptops"
        );
        const reponse_furniture = await axios.get(
          "https://dummyjson.com/products/category/furniture"
        );
        BestofDeals(reponse.data.products);
        BestofDealsoffurniture(reponse_furniture.data.products);
        console.log(reponse_furniture);
      } catch (error) {
        toast.error(error.message);
      } finally {
        Setisloadingpage(false);
      }
    };
    best();
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
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>
      <div className="px-4 py-6 bg-gray-50  sticky ">
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
          className="flex overflow-x-auto gap-6 scrollbar-hide px-10 py-2 relative z-10"
        >
          {/* Mens */}
          <div
            className="relative min-w-[90px]"
            onMouseEnter={() => setOpen("mens")}
            onClick={() => setOpen(null)}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/64/4140/4140048.png"
                alt="Mens"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm mt-2 font-medium text-center">Mens</p>
            </div>
          </div>

          {/* Womens */}
          <div
            className="relative min-w-[90px]"
            onMouseEnter={() => setOpen("womens")}
            onClick={() => setOpen(null)}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/64/4140/4140051.png"
                alt="Womens"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm mt-2 font-medium text-center">Womens</p>
            </div>
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
        <div className="ml-5 relative">
          {open === "mens" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white shadow-lg rounded-md p-3 w-44">
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
          <div className="ml-26 relative">
            {open === "womens" && (
              <div className="absolute top-full left-0 mt-2 z-50 bg-white shadow-lg rounded-md p-3 w-44">
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
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={true} />
     {Isloadingpage?<SpinnerLoader/>: <div>
        <div className="mt-5 p-5">
          <div>
            <h3 className="text-xl font-semibold mb-4">Best of Electronics</h3>
          </div>

          <div className="overflow-x-auto py-4 px-2">
            <div className="flex gap-4 justify-center">
              {Deals.length > 0 ? (
                Deals.map((DealsData, index) => (
                  <div
                    key={index}
                    className="relative min-w-[200px] max-w-[200px] bg-white rounded shadow p-3 text-center cursor-pointer"
                    onClick={() =>
                      toast(`The id is ${DealsData.id}`, {
                        icon: "👏",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      })
                    }
                  >
                    <img
                      src={DealsData.thumbnail}
                      alt={DealsData.brand}
                      className="h-40 w-full object-contain rounded"
                    />
                    <p className="text-sm font-medium mt-2">
                      {DealsData.brand}
                    </p>
                    <p className="text-green-600 font-semibold">
                      ₹{DealsData.price}
                    </p>
                    {DealsData.discountPercentage > 5 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-[1px] rounded shadow-lg z-10">
                        {DealsData.discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 w-full">
                  No electronics deals found.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 p-5">
          <div>
            <h3 className="text-xl font-semibold mb-4">Furniture Deals</h3>
          </div>

          <div className="overflow-x-auto py-4 px-2">
            <div className="flex gap-4 justify-center">
              {Dealsoffurniture.length > 0 ? (
                Dealsoffurniture.map((DealsData, index) => (
                  <div
                    key={index}
                    className="relative min-w-[200px] max-w-[200px] bg-white rounded shadow p-3 text-center cursor-pointer"
                    onClick={() =>
                      toast(`The id is ${DealsData.id}`, {
                        icon: "👏",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      })
                    }
                  >
                    {/* Discount Badge - top-right */}
                    {DealsData.discountPercentage >= 5 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-[1px] rounded shadow-lg z-10">
                        {DealsData.discountPercentage}% OFF
                      </div>
                    )}

                    <img
                      src={DealsData.thumbnail}
                      alt={DealsData.brand}
                      className="h-40 w-full object-contain rounded"
                    />
                    <p className="text-sm font-medium mt-2">
                      {DealsData.brand}
                    </p>
                    <p className="text-green-600 font-semibold">
                      ₹{DealsData.price}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 w-full">
                  No Furniture deals found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default Home;
