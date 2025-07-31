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
            ProductsQuantity: product.Productsqt,
            useremailAdded: product.email

        })
        await AddCart.save()

        res.json({ message: "Cart added successfully" })
    } catch (error) {
        console.log(error.message, "error")
    }
});

// cartItemsByEmail router by using get 

router.get('/GetCartprodcuts', async (req, res) => {
    try {
        const { user_Email } = req.query;
        if (!user_Email) {
            res.json({ message: "email not got" })
        }
        const cartItemsByEmail = await cart.find({ useremailAdded: user_Email })
        if (cartItemsByEmail.length === 0) {
            res.status(404).json({ message: "No Cart Items Are there" })
        }
        res.json({ message: cartItemsByEmail })

    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
});

// cartItemsRmvByEmail by using delete
router.delete("/ProductDelete", async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(404).json({ message: "Id is not got" })
        }
        const Delete_Product = await cart.findByIdAndDelete({ _id: id })
        console.log(Delete_Product)
        res.json({ message: Delete_Product })
    } catch (error) {
        res.json({ message: error.message })
    }

})

module.exports = router;
