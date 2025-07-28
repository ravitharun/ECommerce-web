import axios from "axios";
import CheckUser from "../Auth/CheckUser";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Pay({ amount = 100 }) {
  async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load!");
        return;
      }

      // ✅ Step 1: Create order from backend (NO ID passed)
      const response = await axios.post(
        "http://localhost:5000/api/create-order",
        {
          amount,
        }
      );

      console.log(response.data, "🧾 Razorpay Order");

      // ✅ Step 2: Use Razorpay's order ID
      const options = {
        key: "rzp_test_kWx7lSwo6ofpJI",
        amount: response.data.amount,
        currency: "INR",
        name: "Tharun Ravi",
        description: "Test Payment",
        order_id: response.data.id, // ✅ Razorpay order_id from backend
        handler: function (res) {
          console.log("✅ Payment Success:", res);
        },
        prefill: {
          name: "Tharun Ravi",
          email: "tharun@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("❌ Payment error:", error.message);
    }
  }

  return (
    <>
      <CheckUser></CheckUser>
      <button
        onClick={displayRazorpay}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Buy Now
      </button>
    </>
  );
}

export default Pay;
