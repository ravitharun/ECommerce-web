const mongoose = require("mongoose");
console.log("🔍 require is:", typeof require);

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Ecommrece", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define User schema
const userSchema = new mongoose.Schema({
  role: { type: String, default: "Customer", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
// add to cart
const UserCart = new mongoose.Schema({
  Productid: { type: String, require: true },
  productTitle: { type: String, require: true },
  productThumbnail: { type: String, require: true },
  productPrice: { type: Number, require: true },
  productDescription: { type: String, require: true },
  ProductsQuantity: { type: Number, require: true },
  useremailAdded: { type: String, require: true }
})

// Create User model
const User = mongoose.model("User", userSchema);
const cart = mongoose.model('Cart', UserCart)
// ✅ Correct export
module.exports = { User, cart };
