const express = require("express")
const router = express.Router()
var bodyParser = require("body-parser");
const app = express();
const ProductModel = require("../model/Product")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.post("/latestProducts", function (req, res, next) {
    const page_size = 4;
    const numberPage = req.body.numberPage;
    const page = parseInt(numberPage);
    ProductModel.find({})
        .skip((page - 1) * page_size)
        .limit(page_size)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json("Loi ben server")
        })
})
const increases = function (array) {
    const n = array.length - 1
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
            if (array[j].price > array[j + 1].price) {
                let trunggian = array[j]
                array[j] = array[j + 1]
                array[j + 1] = trunggian
            }
        }
    }
    return array
}
const reduce = function (array) {
    const n = array.length - 1
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
            if (array[j].price < array[j + 1].price) {
                let trunggian = array[j]
                array[j] = array[j + 1]
                array[j + 1] = trunggian
            }
        }
    }
    return array
}
router.post("/latestProducts/increasesPrice", function (req, res, next) {
    ProductModel.find({})
        .then((data) => {
            const result = increases(data)
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json("Loi ben server")
        })
})
router.post("/latestProducts/selling", async function (req, res, next) {
    try {
        const data = await ProductModel.find({})
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - 1 - i; j++) {
                if (data[j].sold > data[j + 1].sold) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        res.json(data)
    } catch (error) {
        res.status(500).json("loi ben server")
    }
})
router.post("/latestProducts/reducePrice", function (req, res, next) {
    ProductModel.find({})
        .then((data) => {
            const result = reduce(data)
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json("Loi ben server")
        })
})
router.post("/latestProducts/new", function (req, res, next) {
    ProductModel.find({})
        .then((data) => {
            res.json(data.reverse())
        })
        .catch((err) => {
            res.status(500).json("Loi ben server")
        })
})
router.get("/lengths", function (req, res, next) {
    ProductModel.find({})
        .then((data) => {
            res.json(data.length)
        })
        .catch(err => {
            res.status(500).json("Loi ben server")
        })
})
router.get("/", async function (req, res, next) {
    try {
        const request = await ProductModel.find({})
        const result = request.reverse()
        const data = result.slice(0, 20)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})
module.exports = router