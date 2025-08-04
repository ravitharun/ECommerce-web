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

const UserLocation = new mongoose.Schema({
  USerEmail: { type: String, required: true },
  Country: { type: String, required: true },
  State: { type: String, required: true },
  City: { type: String, required: true },
  PostCode: { type: Number, required: true }
})

const Wishlist = new mongoose.Schema({
  ProductId: { type: Number },
  productPrice: { type: Number },
  productTitle: { type: String },
  UserEmail: { type: String },
  productThumbnail: { type: String },
  productDescription: { type: String },

})
// Create User model
const User = mongoose.model("User", userSchema);
const LocationUSer = mongoose.model("UserLocation", UserLocation);
const cart = mongoose.model('Cart', UserCart)
const wishlist = mongoose.model('Wishlist', Wishlist)
// ✅ Correct export
module.exports = { User, cart, LocationUSer,wishlist };
