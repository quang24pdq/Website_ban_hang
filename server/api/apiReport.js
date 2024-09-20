const express = require("express")
const app = express()
const router = express.Router()
const ProductModel = require("../model/Product")
const OrderModel = require("../model/Order")
router.get("/entered-sold", async function (req, res, next) {
    try {
        const products = await ProductModel.find({})
        const total_entered = products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.entered
        }, 0)
        const total_sold = products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.sold
        }, 0)
        res.json({ total_entered, total_sold })
    } catch (error) {
        res.json(error)
    }
})
router.get("/chart-products", async function (req, res, next) {
    const endOfWeek = new Date()
    endOfWeek.setHours(23, 59, 59, 999)
    const startOfWeek = new Date()
    startOfWeek.setDate(endOfWeek.getDate() - 6)
    const date = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        const kq = day.setDate(startOfWeek.getDate() + i);
        return new Date(kq)
    })
    var array = []
    for (var i = 0; i < 7; i++) {
        const value = date[i].setHours(0, 0, 0, 0)
        const kq = await OrderModel.find({
            $and: [{ date: value }, { status: { $in: ["00", "100"] } }]
        })
        const result = kq.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.total_order
        }, 0)
        array.push({
            date: (new Date(value)).toLocaleString(),
            data: result
        })
    }
    res.json(array)
})
router.get("/", async function (req, res, next) {
    try {
        const request = await ProductModel.find({})
        const result = request
        const chi = result.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.import_price * currentValue.entered)
        }, 0)
        const thu = result.reduce((accumulator, currentValue) => {
            return currentValue.priceSale ? accumulator + (currentValue.sold) * currentValue.priceSale : accumulator + (currentValue.sold) * currentValue.price
        }, 0)
        res.json({
            chi: (chi * 1000).toLocaleString("vn-VN", { useGrouping: true }),
            thu: (thu * 1000).toLocaleString("vn-VN", { useGrouping: true }),
            ban: ((chi - thu) * 1000).toLocaleString("vn-VN", { useGrouping: true })
        })
    } catch (error) {
        res.json(error)
    }
})
router.post("/custom-chart-products", async function (req, res, next) {
    const dataSend = req.body.date
    const start = new Date(dataSend)
    const startOfWeek = new Date(start.setDate(start.getDate() - 1))
    startOfWeek.setHours(0, 0, 0, 0)
    const date = Array.from({ length: 7 }, (_, i) => {
        const kq = startOfWeek.setDate(startOfWeek.getDate() + 1);
        return new Date(kq)
    })
    var array = []
    for (var i = 0; i < 7; i++) {
        const value = date[i].setHours(0, 0, 0, 0)
        const kq = await OrderModel.find({
            $and: [{ date: value }, { status: { $in: ["00", "100"] } }]
        })
        const result = kq.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.total_order
        }, 0)
        array.push({
            date: (new Date(value)).toLocaleString(),
            data: result
        })
    }
    res.json(array)
})
router.get("/chart-type-sold", async function (req, res, next) {
    const product = await ProductModel.find({})
    const shirt = product.filter((item, index) => {
        return item.type == "Áo"
    })
    const sold_shirt = shirt.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sold
    }, 0)
    const trouser = product.filter((item, index) => {
        return item.type == "Quần"
    })
    const sold_trouser = trouser.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sold
    }, 0)
    const dress = product.filter((item, index) => {
        return item.type == "Váy"
    })
    const sold_dress = dress.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sold
    }, 0)
    const shoe = product.filter((item, index) => {
        return item.type == "Giày"
    })
    const sold_shoe = shoe.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sold
    }, 0)
    const bag = product.filter((item, index) => {
        return item.type == "Túi"
    })
    const sold_bag = bag.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sold
    }, 0)
    const more = product.filter((item, index) => {
        return item.type != "Quần" && item.type != "Áo" && item.type != "Váy" && item.type != "Giày" && item.type != "Túi"
    })
    const sold_more = more.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sold
    }, 0)
    res.json({
        data: {
            shirt: sold_shirt,
            trouser: sold_trouser,
            dress: sold_dress,
            shoe: sold_shoe,
            bag: sold_bag,
            more: sold_more
        }
    })

})
router.get("/chart-type-entered", async function (req, res, next) {
    const product = await ProductModel.find({})
    const shirt = product.filter((item, index) => {
        return item.type == "Áo"
    })
    const entered_shirt = shirt.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.entered
    }, 0)
    const trouser = product.filter((item, index) => {
        return item.type == "Quần"
    })
    const entered_trouser = trouser.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.entered
    }, 0)
    const dress = product.filter((item, index) => {
        return item.type == "Váy"
    })
    const entered_dress = dress.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.entered
    }, 0)
    const shoe = product.filter((item, index) => {
        return item.type == "Giày"
    })
    const entered_shoe = shoe.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.entered
    }, 0)
    const bag = product.filter((item, index) => {
        return item.type == "Túi"
    })
    const entered_bag = bag.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.entered
    }, 0)
    const more = product.filter((item, index) => {
        return item.type != "Quần" && item.type != "Áo" && item.type != "Váy" && item.type != "Giày" && item.type != "Túi"
    })
    const entered_more = more.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.entered
    }, 0)
    res.json({
        data: {
            shirt: entered_shirt,
            trouser: entered_trouser,
            dress: entered_dress,
            shoe: entered_shoe,
            bag: entered_bag,
            more: entered_more
        }
    })

})
module.exports = router