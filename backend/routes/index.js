const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_kWx7lSwo6ofpJI", // your key
  key_secret: "YOUR_SECRET_KEY",     // your secret
});

router.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount, // amount in paise (e.g. ₹100 = 10000)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    console.log(options, 'options')
    const order = await razorpay.orders.create(options);
    res.json(order); // send Razorpay order response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});


module.exports = router;
