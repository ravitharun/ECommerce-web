const express = require('express');
const router = express.Router();





router.post('/login', async (req, res) => {
    const { User_info } = req.body
    if (User_info.FullName == "" && User_info.Email == "" && User_info.Password == "" && User_info.Password == "") {
        return res.json({ message: "PLease Fill the form Information" })

    }
    // const user_Auth=await UserLogin.findOne({Email:Email})
    // if (!user_Auth) {
    //     return res.json({ message: "no user Found " })
    // }

    // if (user_Auth.Role == User_info.Role && user_Auth.Password == User_info.Password) {
    //     return res.json({ message: "You are valid User" });
    // }

    // res.json({ message: "Please Check the Login Role and Password" });

    res.json({ message: "Data got and saved in db" })

});

router.get('/get', (req, res) => {
    console.log("Test GET hit");
    res.send("Get route working");
});

module.exports = router;
