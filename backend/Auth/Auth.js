const express = require('express');
const { User } = require('../bin/Database');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const SECRET_KEY = "7f8e2aef0e5d4e3a9d79f82c36b98b7ed8b12e754b53ee61d93acbd1089987cf";
// it is used to check the Login user is valid or not 
router.get("/login", (req, res) => {
  const { email, password } = req.query; // ✅ This is correct for GET with query
  console.log("Query Received:", email, password);

  if (email === "ravi@example.com" && password === "123456") {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/new", async (req, res) => {
    try {
        const { User_info } = req.body;
        console.log(User_info)
        const find_user_exit = await User.findOne({ email: User_info.Email })
        if (find_user_exit) {
            return res.json({ message: "User already Exits" })
        }

        bcrypt.hash(User_info.Password, saltRounds, async function (err, hash) {
            const Newuser = await User({
                name: User_info.FullName,
                email: User_info.Email,
                role: User_info.Role,
                password: hash
            })
            await Newuser.save()
            res.json({ message: "data saved" })
        });
    } catch (error) {
        console.log(error.message, 'error.message')
        return res.json({ message: error.message });
    }
});


module.exports = router;
