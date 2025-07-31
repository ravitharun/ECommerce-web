const express = require('express');
// const { User } = require('../bin/Database');
const router = express.Router()


router.post('/add', (req, res) => {
    try {
        const { product } = req.body;
        console.log('product cart = ', product)
        res.json({ message: "Cart added successfully" })
    } catch (error) {
        console.log(error.message, "error")
    }
});
router.get('/', (req, res) => {
    // Add your get-cart logic here
    res.json({ cart: [] });
});
module.exports = router;
