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
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create User model
const User = mongoose.model("User", userSchema);

// ✅ Correct export
module.exports = { User };
