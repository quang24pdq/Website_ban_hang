const express = require("express")
const router = express.Router();
const app = express()
const ProductModel = require("../model/Product")
var bodyParser = require('body-parser')
const { increases, reduce, selling, news } = require("./functionProducts")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.post("/", function (req, res, next) {
    const name = req.body.name
    const price = req.body.price
    const priceSale = req.body.priceSale
    const type = req.body.type
    const imgDefault = req.body.imgDefault
    const imgHover = req.body.imgHover
    const size = req.body.size
    const color = req.body.color
    const detail = req.body.detail
    const import_price = req.body.importPrice
    const entered = req.body.entered
    const sold = req.body.sold
    ProductModel.findOne({
        name: name
    })
        .then((data) => {
            if (data) {
                res.json({
                    message: "Vat pham ton tai",
                    success: false
                })
            }
            else {
                ProductModel.create({
                    import_price: import_price,
                    sold: sold,
                    entered: entered,
                    name: name,
                    price: price,
                    priceSale: priceSale,
                    type: type,
                    imgDefault: imgDefault,
                    imgHover: imgHover,
                    size: size,
                    color: color,
                    detail: detail
                })
            }
        })
})
router.post("/update", function (req, res, next) {
    const name = req.body.name
    const price = req.body.price
    const priceSale = req.body.priceSale
    const type = req.body.type
    const imgDefault = req.body.imgDefault
    const imgHover = req.body.imgHover
    const size = req.body.size
    const color = req.body.color
    const detail = req.body.detail
    const id = req.body.id
    const import_price = req.body.importPrice
    const entered = req.body.entered
    const sold = req.body.sold
    ProductModel.findByIdAndUpdate({
        _id: id
    }, {
        import_price: import_price,
        sold: sold,
        entered: entered,
        name: name,
        price: price,
        priceSale: priceSale,
        type: type,
        imgDefault: imgDefault,
        imgHover: imgHover,
        size: size,
        color: color,
        detail: detail
    })
        .then((data) => {
            res.json({
                message: "Cập nhật thành công",
                success: true
            })
        })

})
router.post("/like", function (req, res, next) {
    const type = req.body.type
    ProductModel.find({
        type: type
    })
        .then((data) => {
            if (data) {
                res.json({
                    message: "Thanh cong",
                    data: data
                })
            }
            else {
                res.json({ message: "That bai" })
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
// trend
router.get("/trend/increasesPrice", async function (req, res, next) {
    try {
        const data = await ProductModel.find({})
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                var tg;
                if (data[j].sold > data[j + 1].sold) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        const arrayProducts = data.slice(data.length - 20, data.length)
        const kq = increases(arrayProducts)
        res.json(kq)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/trend/reducePrice", async function (req, res, next) {
    try {
        const data = await ProductModel.find({})
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                var tg;
                if (data[j].sold > data[j + 1].sold) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        const arrayProducts = data.slice(data.length - 20, data.length)
        const kq = reduce(arrayProducts)
        res.json(kq)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/trend/new", async function (req, res, next) {
    try {
        const data = await ProductModel.find({})
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                var tg;
                if (data[j].sold > data[j + 1].sold) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        const arrayProducts = data.slice(data.length - 20, data.length)
        res.json(arrayProducts.reverse())
    } catch (error) {
        res.status(500).json(error)
    }

})
router.get("/trend", async function (req, res, next) {
    try {
        const data = await ProductModel.find({})
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                var tg;
                if (data[j].sold > data[j + 1].sold) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        const arrayProducts = data.slice(0, 20)
        res.json(arrayProducts)
    } catch (error) {
        res.status(500).json(error)
    }

})
// end trend
//  sales
router.get("/sales/increasesPrice", async function (req, res, next) {
    try {
        const data = await ProductModel.find({
            $and: [
                { priceSale: { $exists: true } }, { priceSale: { $ne: null } }
            ]
        })
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                var tg;
                if (data[j].priceSale > data[j + 1].priceSale) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/sales/reducePrice", async function (req, res, next) {
    try {
        const data = await ProductModel.find({
            $and: [
                { priceSale: { $exists: true } }, { priceSale: { $ne: null } }
            ]
        })
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                var tg;
                if (data[j].priceSale < data[j + 1].priceSale) {
                    let tg = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = tg
                }
            }
        }
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/sales/selling", async function (req, res, next) {
    try {
        const data = await ProductModel.find({
            $and: [
                { priceSale: { $exists: true } }, { priceSale: { $ne: null } }
            ]
        })
        const kq = selling(data).reverse()
        res.json(kq)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/sales/new", async function (req, res, next) {
    try {
        const data = await ProductModel.find({
            $and: [
                { priceSale: { $exists: true } }, { priceSale: { $ne: null } }
            ]
        })
        res.json(news(data))
    } catch (error) {
        res.status(500).json(error)
    }

})
router.get("/sales", async function (req, res, next) {
    try {
        const data = await ProductModel.find({
            $and: [
                { priceSale: { $exists: true } }, { priceSale: { $ne: null } }
            ]
        })
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }

})
router.get("/detail/:productId", function (req, res, next) {
    return res.json(req.data[0])
})
router.param("productId", function (req, res, next, name) {
    ProductModel.find({
        name: name
    })
        .then((data) => {
            if (data) {
                req.data = data
                next()
            }
            else {
                res.json("khong tim thay san pham")
            }
        })
        .catch((err) => {
            res.status(400).json("Khong co san pham")
        })
})
//admin
router.post("/delete", (req, res, next) => {
    const id = req.body.id;
    ProductModel.findByIdAndRemove({
        _id: id
    })
        .then((data) => {

        })
})
router.post("/findCode", async (req, res, next) => {
    const code = req.body.code;
    try {
        const findProduct = await ProductModel.find({
            uniqueCode: code
        })
        const result = findProduct
        res.json(result)
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.get("/", function (req, res, next) {
    const query = req.query
    const page = parseInt(query.page)
    const page_size = 8
    try {
        ProductModel.find({})
            .skip((page - 1) * page_size)
            .limit(page_size)
            .then((data) => {
                res.json(data)
            })
    } catch (error) {
        res.status.json("Loi server 500")
    }
})
router.get("/total_products", async (req, res, next) => {
    try {
        const request = await ProductModel.find({})
        const result = request.length
        res.json(result)
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})

module.exports = router