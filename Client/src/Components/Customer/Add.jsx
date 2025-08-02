import axios from "axios";
import toast from "react-hot-toast";
import { BsCartCheckFill } from "react-icons/bs"; // 🛒 Success icon

const send = async (
  UserEmail,
  id,
  productTitle,
  productPrice,
  productDescription,
  productThumbnail
) => {
  try {
    const data = {
      UserEmail,
      id,
      productTitle,
      productPrice,
      productDescription,
      productThumbnail,
    };

    const response_wishlist = await axios.post(
      "http://localhost:3000/api/cart/whilist",
      { productWhilist: data }
    );

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } w-full max-w-sm bg-green-100 border-l-4 border-green-400 rounded-md shadow-md p-4 flex  items-start space-x-4 font-mono`}
      >
        {/* Icon */}
        <div className="text-green-800 mt-1 text-2xl">
          <BsCartCheckFill />
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-green-800 font-semibold text-base mb-1">
            Added to Wishlist!
          </p>
          <p className="text-green-700 text-sm">
            {response_wishlist.data.message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-green-600 hover:text-green-800 font-bold text-lg"
        >
          ×
        </button>
      </div>
    ));
  } catch (error) {
    console.log(error.message, "err from the Wishlist ");
  }
};

export default send;
