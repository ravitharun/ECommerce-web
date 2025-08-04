import axios from "axios";
import { useState, useEffect } from "react";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { useNavigate } from "react-router-dom";

function RelatedProduct({ Products }) {
  const [Categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `https://dummyjson.com/products/category/${Products}`
        );
        setCategories(response.data.products);
      } catch (error) {
        console.error(error.message);
        alert("Failed to load related products");
      } finally {
        setLoader(false);
      }
    };

    fetchRelatedProducts();
  }, [Products]);
  return (
    <div className="py-6 px-4 md:px-10">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        Related Products in <span className="text-blue-600">{Products}</span>
      </h3>

      {loader ? (
        <div className="flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
          {Categories.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                navigate("/ProductDetails", { state: product.id });

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2 truncate">
                  {product.title}
                </h4>
                <p className="text-gray-500 mb-2 truncate">
                  {product.description}
                </p>
                <p className="text-blue-600 font-bold text-lg">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RelatedProduct;
