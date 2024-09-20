const express = require("express")
const app = express()
const AccountModel = require("../model/Account")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const router = express.Router()
router.post("/addcart", async function (req, res, next) {
    const user_name = req.body.user_name
    const name_product = req.body.name_product
    const price = req.body.price
    const image = req.body.image
    const size = req.body.size
    const color = req.body.color
    const quantity = req.body.quantity
    try {
        const updateCart = await AccountModel.findOneAndUpdate({
            name: user_name
        }, {
            $push: {
                cart: [
                    {
                        name_product: name_product,
                        price: price,
                        image: image,
                        size: size,
                        color: color,
                        quantity: quantity
                    }
                ]
            }
        })
        const result = updateCart
    } catch (error) {
        console.log(error)
    }
})
router.post("/deleteCart", async function (req, res, next) {
    const user_name = req.body.user_name
    const id = req.body.id
    try {
        const resApi = await AccountModel.updateOne({
            name: user_name
        }, {
            $pull: {
                cart: {
                    _id: id
                }
            }
        })
        const result = resApi
    } catch (error) {
        res.status(500).json("123")
    }
})
router.post("/updateQuantity", async function (req, res, next) {
    const user_name = req.body.user_name;
    const id = req.body.id;
    const quantity = req.body.quantity;
    try {
        AccountModel.updateOne({
            name: user_name
        }, {
            $set: { "cart.$[elem].quantity": quantity }
        }, {
            arrayFilters: [{ "elem._id": { $eq: id } }]
        })
            .then((data) => {
                res.json(data)
            })
    } catch (error) {
        res.json("that bai")
    }
})
router.post("/deleteAll", async function (req, res, next) {
    const user_name = req.body.user_name;
    try {
        const requestApi = await AccountModel.findOneAndUpdate({
            name: user_name
        }, {
            cart: []
        })
        const result = requestApi

    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
module.exports = router