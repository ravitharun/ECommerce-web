const express = require('express');
const { User } = require('../bin/Database');
const router = express.Router()


// it is used to check the Login user is valid or not 
router.post('/login', async (req, res) => {
    const { User_info } = req.body
    if (User_info.FullName == "" && User_info.Email == "" && User_info.Password == "" && User_info.Password == "") {
        return res.json({ message: "PLease Fill the form Information" })

    }
    const user_Auth=await User.findOne({Email:Email})
    if (!user_Auth) {
        return res.json({ message: "no user Found " })
    }

    if (user_Auth.Role == User_info.Role && user_Auth.Password == User_info.Password) {
        return res.json({ message: "You are valid User" });
    }


    res.json({ message: "Data got and saved in db" })

});
router.post("/signup",(req,res)=>{
  const {User_info}=req.body
})

module.exports = router;
