const express = require('express');
const { cart } = require('../bin/Database');
const router = express.Router()

router.post('/add', async (req, res) => {
    try {
        const { product } = req.body;

        // check the product is already in cart
        const isProductAvailable = await cart.findOne({
            Productid: product.id,
            useremailAdded: product.email,
        }); if (isProductAvailable) {
            return res.json({ message: "The Product Is Already In Cart" })
        }
        const AddCart = await new cart({
            Productid: product.id,
            productTitle: product.productTitle,
            productThumbnail: product.productThumbnail,
            productDescription: product.productDescription,
            productPrice: product.productPrice,
            useremailAdded: product.email

        })
        await AddCart.save()

        res.json({ message: "Cart added successfully" })
    } catch (error) {
        console.log(error.message, "error")
    }
});




router.get('/', (req, res) => {
    try {


    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
});
module.exports = router;
