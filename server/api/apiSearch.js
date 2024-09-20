const express = require('express')
const router = express.Router()
const app = express()
const ProductModel = require("../model/Product")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.post("/", async function (req, res, next) {
    try {
        const value = req.body.value;
        const arrayIndex = []
        const responsive = await ProductModel.find({})
        const arrayName = []
        const find = (encodeURIComponent(value.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        const kq = []
        for (let i = 0; i < responsive.length; i++) {
            arrayName.push(encodeURIComponent((responsive[i].name.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        }
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i].includes(find) == true) {
                arrayIndex.push(i)
            }
        }
        arrayIndex.forEach((item, index) => {
            return kq.push(responsive[item])
        })
        res.json(kq)
    } catch (error) {
        res.status(500).json("Loi ben server error")
    }
})
router.get("/", async function (req, res, next) {
    const query = req.query
    const value = String(query.search)
    try {
        const arrayIndex = []
        const responsive = await ProductModel.find({})
        const arrayName = []
        const find = (encodeURIComponent(value.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        const kq = []
        for (let i = 0; i < responsive.length; i++) {
            arrayName.push(encodeURIComponent((responsive[i].name.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        }
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i].includes(find) == true) {
                arrayIndex.push(i)
            }
        }
        arrayIndex.forEach((item, index) => {
            return kq.push(responsive[item])
        })
        res.json(kq)
    } catch (error) {
        res.status(500).json("Loi ben server error")
    }
})
module.exports = router