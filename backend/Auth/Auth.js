const express = require('express');
const { User, userDetails } = require('../bin/Database');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const SECRET_KEY = "7f8e2aef0e5d4e3a9d79f82c36b98b7ed8b12e754b53ee61d93acbd1089987cf";
// it is used to check the Login user is valid or not 


const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Token missing" });

    const token = authHeader.split(" ")[1];
    console.log(token, 'token')
    if (!token) return res.status(401).json({ message: "Token format error" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next(); // go to the next route
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};


router.get("/login", async (req, res) => {
    try {
        const { email, password, role } = req.query;
        console.log(email, "role")
        if (email == "" && password == "" && role == "") {
            return res.json({ fillMessage: "Please fill all required fields" });
        }
        const Is_Created_User = await User.findOne({ email: email });
        console.log(Is_Created_User)
        if (Is_Created_User == null) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare password
        bcrypt.compare(password, Is_Created_User.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing password" });
            }

            if (result && role === Is_Created_User.role) {
                const token = jwt.sign(
                    { email: Is_Created_User.email, role: Is_Created_User.role },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );

                return res.json({ message: "Login successful", user: Is_Created_User, token });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
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
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Protected content", user: req.user });
});


// save the user profile data
router.post("/Userprofile", async (req, res) => {
    try {
        const { UserMeta } = req.body
        if (UserMeta.Email == '' || UserMeta.PhoneNumber == '' || UserMeta.state == '' || UserMeta.city == '' || UserMeta.pincode == '' || UserMeta.country == '') {
            console.log('Fill the required Data')
            return res.json({ message: "Fill the required Data" })

        }
        console.log(UserMeta, 'UserMeta')
        const ischeck = await userDetails.findOne({ email: UserMeta.Email })
        if (ischeck) { return res.json({ message: "the email is already Used" }) }
        const Profile_user = await new userDetails(
            {
                gender: UserMeta.Gender,
                name: UserMeta.Name,
                email: UserMeta.Email,
                PhoneNumber: UserMeta.PhoneNumber,
                state: UserMeta.state,
                pincode: UserMeta.postcode,
                country: UserMeta.country,
                city: UserMeta.city,

                LoginEmail: UserMeta.LoginEmail
            })
        await Profile_user.save()
        res.json({ message: 'the profile has created' })

    } catch (error) {
        res.json({ message: error.message })
    }
})
//  GET THE USER PROFILE DATA AND SEND IT TO UI 
router.get('/GetPfData', async (req, res) => {
    const { PfEmail } = req.query
    if (!PfEmail) {
        return res.json({ message: "The email is not found from the Profile " })
    }
    const getPfdata_Email = await userDetails.findOne({ LoginEmail: PfEmail })
    if (!getPfdata_Email) {
        console.log("that there's no Profile")
        return res.json({ message: "that there is no Profile" })

    }
    res.json({ getPfdata_Email, message: "The profile is created" })
})

module.exports = router;
