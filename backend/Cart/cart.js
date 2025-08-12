const express = require('express');
const { cart, LocationUSer, wishlist } = require('../bin/Database');
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
            return res.status(404).json({ message: "No Cart Items Are there" })
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
        const { ProductId } = req.query
        console.log('ProductId', ProductId)
        if (!ProductId) {
            return res.json({ message: "Id is not got" })
        }
        const Delete_Product = await cart.findByIdAndDelete({ _id: ProductId })
        console.log(Delete_Product)
        res.json({ message: 'Your Product has been deleted' })
    } catch (error) {
        res.json({ message: error.message })
    }

})

// whilist router

router.post('/whilist', async (req, res) => {
    try {
        const { productWhilist } = req.body
        console.log('productWhilist', productWhilist)
        const Ispresent_product = await wishlist.findOne({ ProductId: productWhilist.id })
        if (Ispresent_product) {
            console.log('item is in exits ')
            return res.json({ message: "The item is already Added in the wishlist" })
        }

        const wishlist_reponse = await new wishlist({
            ProductId: productWhilist.id,
            productPrice: productWhilist.productDescription,
            productTitle: productWhilist.productTitle,
            UserEmail: productWhilist.UserEmail,
            productThumbnail: productWhilist.productThumbnail,
            productDescription: productWhilist.productPrice
        })
        await wishlist_reponse.save()

        res.json({ message: "The Item is added in wishlist" })
    } catch (error) {
        console.log(error.message)
        return res.json({ message: error.message })

    }
})

// rmv the wishlist router from db
router.get("/wishlist/All", async (req, res) => {
    try {
        const { Email } = req.query
        console.log('useremail for whilist products', Email)
        const reponse = await wishlist.find({ UserEmail: Email })
        console.log(reponse)
        res.json({ message: reponse })
    } catch (error) {
        return res.json({ message: error.message })
    }
})



router.post('/Location/new', async (req, res) => {
    const { UserNewLocationData } = req.body;
    console.log('UserNewLocationData', UserNewLocationData)
    if (UserNewLocationData.email == '') {

        return res.json({ message: "email is not found Please Try again logout and try to login in again" })
    }
    const User_maxLocation = await LocationUSer.find({ USerEmail: UserNewLocationData.email }).countDocuments()
    if (User_maxLocation >= 2) {
        return res.json({ message: "Only Min 2 Location U Can Add" })
    }

    if (UserNewLocationData.country == "" || UserNewLocationData.State == '' || UserNewLocationData.City == '' || UserNewLocationData.PostCode == '') {
        return res.json({ message: "Fill the required Data" })
    }
    const saveDataLocation = new LocationUSer({
        USerEmail: UserNewLocationData.email,
        Country: UserNewLocationData.Country,
        State: UserNewLocationData.State,
        City: UserNewLocationData.City,
        PostCode: UserNewLocationData.PostCode
    })
    await saveDataLocation.save()
})


router.get('/Get/Location', async (req, res) => {
    const { UserEmail } = req.query
    console.log(UserEmail, 'UserEmail')
    if (!UserEmail) { return res.json({ message: "No email Is required" }) }
    const response_Location = await LocationUSer.find({ USerEmail: UserEmail })
    if (response_Location.length === 0) {
        return res.json({ message: "Oops! We couldn't find your location. Please add it to get started." });

    }
    res.json({
        message:
            response_Location
    })
})



router.patch("/Location/update", async (req, res) => {
    const { LocationData } = req.body

    res.json({ message: "Location is Saved" })
})

module.exports = router;
