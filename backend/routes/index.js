const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const router = require("../Auth/Auth");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_dOytfbYkx3mnSm",
  key_secret: "mtEJ7XHApaMPWcf2n3Mb4SLu",
});

router.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });
    res.json({ success: true, message: order });
  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({ success: false, error: "Payment failed", details: err.message });
  }
});


module.exports = router;
