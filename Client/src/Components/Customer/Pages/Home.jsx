import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { useNavigate } from "react-router-dom";
import CheckUser from "../../Auth/CheckUser";
import Marquee from "../Marquee";
import { SkeletonCard } from "../Loaders/SkeletonCard";
import Footer from "./Footer";

function Home() {
  const [categories, setCategories] = useState({});
  const [Deals, BestofDeals] = useState([]);
  const [DropDown, Setdropdown] = useState([]);
  const [Dealsoffurniture, BestofDealsoffurniture] = useState([]);
  const scrollRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [Isloadingpage, Setisloadingpage] = useState({});
  //
  const navigate = useNavigate("");
  useEffect(() => {
    const categoryData = {
      genral: [
        {
          name: "Groceries",
          img: "https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100",
        },
        {
          name: "fragrances",
          img: "https://media.glamourmagazine.co.uk/photos/639362467b473e3dc755fb1e/16:9/w_2580,c_limit/BEST%20PERFUME%20FOR%20WOMEN%2091222_SF.jpg?mbid=social_retweet",
        },
        {
          name: "furniture",
          img: "https://tse3.mm.bing.net/th/id/OIP.tsL3Jz8jzvfsKsg6TR-TLQHaFS?pid=Api&P=0&h=180",
        },
        {
          name: "home-decoration",
          img: "https://tse2.mm.bing.net/th/id/OIP.6dF-_Y0FYdjcyot4uaDFmgHaHa?pid=Api&P=0&h=180",
        },
        {
          name: "kitchen-accessories",
          img: "https://tse3.mm.bing.net/th/id/OIP.Mq9c-8delxxRRfRBQRo9PAAAAA?pid=Api&P=0&h=180",
        },
        {
          name: "laptops",
          img: "https://tse3.mm.bing.net/th/id/OIP.DLRLitiNsit7bTV1G3tv-gHaGD?pid=Api&P=0&h=180",
        },
        {
          name: "mobile-accessories",
          img: "https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/thumbnail.webp",
        },
        {
          name: "motorcycle",
          img: "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/thumbnail.webp",
        },
        {
          name: "skin-care",
          img: "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp",
        },
        {
          name: "smartphones",
          img: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
        },
        {
          name: "sports-accessories",
          img: "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp",
        },
        {
          name: "sunglasses",
          img: "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp",
        },
        {
          name: "tablets",
          img: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp",
        },
        {
          name: "tops",
          img: "https://cdn.dummyjson.com/product-images/tops/gray-dress/thumbnail.webp",
        },
        {
          name: "vehicle",
          img: "https://cdn.dummyjson.com/product-images/vehicle/300-touring/thumbnail.webp",
        },
      ],
      mens: [
        {
          name: "mens-shirts",
          img: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
        },
        {
          name: "mens-shoes",
          img: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
        },
        {
          name: "mens-watches",
          img: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
        },
      ],
      womens: [
        {
          name: "womens-bag",
          img: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
        },
        {
          name: "womens-dresses",
          img: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp",
        },
        {
          name: "womens-jewellery",
          img: "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp",
        },
        {
          name: "womens-shoes",
          img: "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/thumbnail.webp",
        },
        {
          name: "womens-watches",
          img: "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/thumbnail.webp",
        },
      ],
    };

    setCategories(categoryData);
  }, []);

  useEffect(() => {
    const best = async () => {
      try {
        const initialState = {};

        Deals.forEach((item) => {
          initialState[item.id] = false;
        });
        Setisloadingpage(initialState);
        const reponse = await axios.get(
          "https://dummyjson.com/products/category/laptops"
        );
        const reponse_furniture = await axios.get(
          "https://dummyjson.com/products/category/furniture"
        );
        BestofDeals(reponse.data.products);
        BestofDealsoffurniture(reponse_furniture.data.products);
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
  const SearchProduct = useRef();

  const Search_product = () => {
    console.log(SearchProduct.current.value, "SearchProduct");

    navigate("/Products", { state: SearchProduct.current.value });
  };
  const fetchCategoryProducts = (id) => {
    navigate("/ProductDetails", { state: id });
  };

  // SearchProductQuery
  const SearchProductQuery = (ProductName) => {
    console.log(ProductName, "SearchProductQuery");
    navigate("/Products", { state: ProductName });
  };

  // to show dropdown products
  const ShowDropDownProducts = async (value) => {
    try {
      console.log(value == "", "ShowDropDownProducts");
      if (value.trim() === "") {
        Setdropdown([]);
        return;
      }
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      const products = response.data.products;
      console.log(products, "products");
      if (products.length === 0) {
        toast.error("No products found for this search term.");
        return;
      }
      Setdropdown(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
        <Marquee></Marquee>
      </div>

      <CheckUser></CheckUser>
      {/* Centered Form Section */}
     <div className="relative w-full px-4 py-6">
  <label htmlFor="search" className="block text-gray-800 font-medium mb-2">
    Search for Products
  </label>
  <input
    type="text"
    id="search"
    placeholder="Search for phones, fashion, electronics..."
    ref={SearchProduct}
    onChange={(event) => ShowDropDownProducts(event.target.value)}
    onKeyDown={(event) => {
      if (event.key === "Enter") Search_product();
    }}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
  />

  {DropDown.length > 0 && (
    <div className="absolute mt-2 w-full bg-white shadow-lg rounded-xl border border-gray-200 z-50">
      <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
        {DropDown.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition"
            onClick={() => {
              fetchCategoryProducts(product.id);
              Setdropdown([]);
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-12 h-12 object-contain rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{product.title}</p>
              <p className="text-xs text-gray-500">₹{product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

      {/* Category Scroll Section */}
      <div className="px-4 py-6 bg-gray-50 relative">
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
              onClick={() => SearchProductQuery(category.name)}
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

        {/* Dropdowns */}
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

      {/* Toast and Deals */}

      <div className="flex gap-4 justify-center">
        {Isloadingpage ? (
          Array(6) // number of loaders you want
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : Deals.length > 0 ? (
          Deals.map((DealsData, index) => (
            <div
              key={index}
              className="relative min-w-[200px] max-w-[200px] bg-white rounded shadow p-3 text-center cursor-pointer"
              onClick={() => fetchCategoryProducts(DealsData.id)}
            >
              <img
                src={DealsData.thumbnail}
                alt={DealsData.brand}
                className="h-40 w-full object-contain rounded"
              />
              <p className="text-sm font-medium mt-2">{DealsData.brand}</p>
              <p className="text-green-600 font-semibold">
                ₹{DealsData.price.toLocaleString()}
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
      <br />
git innu
      <br />
      <div className="flex gap-4 justify-center">
        {Isloadingpage ? (
          Array(6) // number of loaders you want
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : Dealsoffurniture.length > 0 ? (
          Dealsoffurniture.map((DealsData, index) => (
            <div
              key={index}
              className="relative min-w-[200px] max-w-[200px] bg-white rounded shadow p-3 text-center cursor-pointer"
              onClick={() => fetchCategoryProducts(DealsData.id)}
            >
              <img
                src={DealsData.thumbnail}
                alt={DealsData.brand}
                className="h-40 w-full object-contain rounded"
              />
              <p className="text-sm font-medium mt-2">{DealsData.brand}</p>
              <p className="text-green-600 font-semibold">
                ₹{DealsData.price.toLocaleString()}
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
            No furniture deals found.
          </p>
        )}
      </div>
      <br />
      <br className="" />
      <Footer></Footer>
    </>
  );
}

export default Home;
