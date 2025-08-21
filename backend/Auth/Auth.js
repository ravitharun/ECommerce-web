const express = require('express');
const { User, userDetails } = require('../bin/Database');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const SECRET_KEY = "7f8e2aef0e5d4e3a9d79f82c36b98b7ed8b12e754b53ee61d93acbd1089987cf";
const nodemailer = require("nodemailer");
require('dotenv').config();
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const otpGenerator = require('otp-generator')

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
        const { email, password, role, otp } = req.query;
        let ServerOtp = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
        if (ServerOtp == '') {
            return res.json({ message: "otp sent to your email" })

        }

        // checking for email, password, and role
        if (email == "" && password == "" && role == "") {
            return res.json({ fillMessage: "Please fill all required fields" });
        }
        // checking the user is already created or not
        const Is_Created_User = await User.findOne({ email: email });
        console.log(Is_Created_User, 'Is_Created_User')

        if (Is_Created_User == null) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        bcrypt.compare(password, Is_Created_User.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing password" });
            }
            if (result && role === Is_Created_User.role) {
                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: Is_Created_User.email, // recipient's email
                    subject: "🎉 Welcome to ShopZone!",
                    text: `Hey ${Is_Created_User.name}, you created a new account in ShopZone!`, // fallback for plain text
                    html: `
  <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <!-- Card -->
      <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#4CAF50,#2e7d32);padding:20px 24px;text-align:center;color:#ffffff;">
          <div style="font-size:22px;font-weight:700;letter-spacing:0.3px;">ShopZone Security</div>
          <div style="font-size:13px;opacity:0.95;">Two-Factor Authentication</div>
        </div>

        <!-- Body -->
        <div style="padding:24px 28px;">
          <h2 style="margin:0 0 8px 0;font-size:20px;color:#111;">
            Hi ${Is_Created_User?.name || "there"} 👋
          </h2>
          <p style="margin:0 0 14px 0;font-size:14px;line-height:1.6;color:#444;">
            Use the One-Time Password (OTP) below to complete your sign-in to <b>ShopZone</b>.
            This code helps us confirm it’s really you.
          </p>

          <!-- OTP Box -->
          <div style="margin:18px 0;padding:16px;border:1px dashed #dfe3ea;border-radius:10px;background:#fafbff;text-align:center;">
            <div style="font-size:28px;font-weight:700;letter-spacing:10px;color:#111;">
              ${ServerOtp}
            </div>
            <div style="margin-top:8px;font-size:12px;color:#5f6b7a;">
              Expires in <b>10 minutes</b>. Don’t share this code with anyone.
            </div>
          </div>

          <!-- CTA Button (optional deep link) -->
          <div style="text-align:center;margin:18px 0 6px;">
            <a href="#"
               style="display:inline-block;padding:12px 22px;border-radius:10px;background:#4CAF50;color:#fff;text-decoration:none;font-size:14px;font-weight:700;">
              Verify & Sign In
            </a>
          </div>

          <!-- Tips / Security -->
          <ul style="margin:14px 0 0 18px;padding:0;color:#555;font-size:13px;line-height:1.6;">
            <li>If you didn’t request this, you can ignore this email.</li>
            <li>For your security, the code becomes invalid after one use or expiry.</li>
          </ul>
        </div>

        <!-- Footer -->
        <div style="background:#f7f9fc;padding:14px 20px;text-align:center;font-size:12px;color:#6b7280;">
          © ${new Date().getFullYear()} ShopZone · Need help? Contact
          <a href="mailto:support@shopzone.com" style="color:#4CAF50;text-decoration:none;">support@shopzone.com</a>
        </div>
      </div>

      <!-- Secondary Footer -->
      <div style="text-align:center;font-size:11px;color:#8a94a6;margin-top:10px;">
        You’re receiving this because a login was requested for your account.
      </div>
    </div>
  </div>
`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error:", error);
                    } else {
                        console.log("Email sent:", info.response);
                    }
                });
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
            // console.log(Newuser.email,'email')
            await Newuser.save()
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: Newuser.email, // recipient's email
                subject: "🎉 Welcome to ShopZone!",
                text: `Hey ${Newuser.name}, you created a new account in ShopZone!`, // fallback for plain text
                html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        
        <div style="background-color: #4CAF50; padding: 15px; text-align: center; color: white;">
          <h1>Welcome to ShopZone! 🛍️</h1>
        </div>

        <div style="padding: 20px; text-align: center;">
          <h2>Hey ${Newuser.name || "there"} 👋</h2>
          <p style="font-size: 16px; color: #555;">
            Your account has been successfully created in <b>ShopZone</b>.  
            We’re excited to have you with us!
          </p>
          <p style="font-size: 16px; color: #555;">
            Start exploring amazing deals and offers today.
          </p>

          <a href="https://shopzone.com" style="display: inline-block; padding: 12px 20px; margin-top: 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Visit ShopZone
          </a>
        </div>

        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 14px; color: #777;">
          &copy; ${new Date().getFullYear()} ShopZone. All rights reserved.
        </div>

      </div>
    </div>
  `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });

        });
        res.json({ message: "data saved" })

    } catch (error) {
        console.log(error.message, 'error.message')
        return res.json({ message: error.message });
    }
});


router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Protected content", user: req.user });
});

router.patch('/change-password', verifyToken, async (req, res) => {
    try {
        const { useremail, userUpdatepassword } = req.body;
        const hashedPassword = await bcrypt.hash(userUpdatepassword, 10);
        const update_passowrd = await User.findOneAndUpdate({ email: useremail }, { password: hashedPassword }, { new: true })
        console.log(update_passowrd)
        if (!update_passowrd) {
            return res.status(404).json({ message: "User not found" });
        }
        // and here we will send email that email has updated alert
        res.json({ message: `hey ${update_passowrd.name}your password has been updated` })
    } catch (error) {
        console.log(error)
    }
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
