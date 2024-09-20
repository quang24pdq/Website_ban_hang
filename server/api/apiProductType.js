const express = require("express")
const app = express()
const router = express.Router()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const ProductModel = require("../model/Product")
const { increases, reduce, news, selling } = require("./functionProducts")
router.post("/increasesPrice", async function (req, res, next) {
    const type = req.body.type
    try {
        const data = await ProductModel.find({
            type: type
        })
        const result = increases(data)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
router.post("/reducePrice", async function (req, res, next) {
    const type = req.body.type
    try {
        const data = await ProductModel.find({
            type: type
        })
        const result = reduce(data)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
router.post("/new", async function (req, res, next) {
    const type = req.body.type
    try {
        const data = await ProductModel.find({
            type: type
        })
        const result = news(data)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
router.post("/selling", async function (req, res, next) {
    const type = req.body.type
    try {
        const data = await ProductModel.find({
            type: type
        })
        const result = selling(data).reverse()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
router.post("/", async function (req, res, next) {
    const type = req.body.type
    const request = await ProductModel.find({
        type: type
    })
    res.json(request)
})
module.exports = router