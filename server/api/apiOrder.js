const express = require("express")
const app = express()
const router = express.Router()
const OrderModel = require("../model/Order")
const ProductModel = require("../model/Product")
const AccountModel = require("../model/Account")
const jwt = require("jsonwebtoken")
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.get("/", function (req, res, next) {
    const query = req.query
    const page = parseInt(query.page)
    const page_size = 3
    try {
        OrderModel.find({})
            .skip((page - 1) * page_size)
            .limit(page_size)
            .then((data) => {
                res.json(data)
            })
    } catch (error) {
        res.json(err)
    }
})
router.post("/", async (req, res, next) => {
    const token = req.body.user_id
    const user_id = jwt.verify(token, "123")
    const date = new Date()
    date.setHours(0, 0, 0, 0);
    try {
        const order = await OrderModel.create({
            user_id: user_id,
            full_name: req.body.full_name,
            address: req.body.address,
            email: req.body.email,
            total_order: req.body.total_order,
            phone: req.body.phone,
            pay_date: req.body.pay_date,
            bank_code: req.body.bank_code,
            status: req.body.status,
            code: req.body.code,
            items: req.body.items,
            date: date,
        })
        order
    } catch (error) {
        console.log(error)
    }
})
router.post("/delete-order", async (req, res, next) => {
    const code = req.body.code
    try {
        const requestApi = await OrderModel.findOneAndDelete({
            code: code
        })
        const result = requestApi
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/search-order", async (req, res, next) => {
    const code = req.body.code
    try {
        const request = await OrderModel.find({
            code: code
        })
        res.json(request)
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/sort-status", async (req, res, next) => {
    const condition = req.body.condition
    try {
        if (condition == "Thành công") {
            const request = await OrderModel.find({
                status: { $in: ["00", "100"] }
            })
            const result = request
            res.json(result)
        }
        else if (condition == "Thất bại") {
            const request = await OrderModel.find({
                status: { $nin: ["00", "100"] }
            })
            const result = request
            res.json(result)
        }
        else {
            const request = await OrderModel.find({
            })
            const result = request
            res.json(result)
        }
    }
    catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/sort-date", function (req, res, next) {
    const date = req.body.date
    const result = new Date(date)
    const newDate = result.setHours(0, 0, 0, 0)
    OrderModel.find({
        date: newDate
    })
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            res.status(500).json("Loi ben server")
        })
})
router.post("/sort-date_status", async function (req, res, next) {
    const date = req.body.date
    const condition = req.body.condition
    const result = new Date(date)
    const newDate = result.setHours(0, 0, 0, 0)
    try {
        if (condition == "Thành công") {
            const request = await OrderModel.find({
                $and: [
                    { date: newDate }, { status: { $in: ["00", "100"] } }
                ]
            })
            const result = request
            res.json(result)
        }
        else {
            const request = await OrderModel.find({
                $and: [
                    { date: newDate }, { status: { $nin: ["00", "100"] } }
                ]
            })
            const result = request
            res.json(result)
        }
    }
    catch (error) {
        res.status(500).json("Loi ben server")
    }
})
// Custom 


router.post("/user", function (req, res, next) {
    const token = req.body.token
    const user_id = jwt.verify(token, "123")
    const page_size = 2
    const page_number = req.body.page_number
    const page = parseInt(page_number)
    try {
        OrderModel.find({
            user_id: user_id
        })
            .skip((page - 1) * page_size)
            .limit(page_size)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                res.status(500).json("Loi ben server")
            })
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/user/wait_payment", function (req, res, next) {
    const token = req.body.token
    const user_id = jwt.verify(token, "123")
    try {
        AccountModel.findOne({
            _id: user_id
        })
            .then((data) => {
                res.json(data.cart)
            })
    } catch (error) {

    }
})
router.post("/user/transport", function (req, res, next) {
    const token = req.body.token
    const user_id = jwt.verify(token, "123")
    try {
        OrderModel.find({
            $and: [
                { user_id: user_id }, { "items.status_transport": "Đang giao hàng" }
            ]
        })
            .then((data) => {
                var array = []
                const result = data.map((item, index) => {
                    return item.items
                })
                for (var i = 0; i < result.length; i++) {
                    result[i].map((item, index) => {
                        return array.push(item)
                    })
                }
                const kq = array.filter((item, index) => {
                    return item.status_transport == "Đang giao hàng"
                })
                res.json(kq)
            })
            .catch((error) => {
                res.status(500).json("Loi ben server")
            })
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/user/complete", function (req, res, next) {
    const token = req.body.token
    const user_id = jwt.verify(token, "123")
    try {
        OrderModel.find({
            $and: [
                { user_id: user_id }, { "items.status_transport": "Hoàn thành" }
            ]
        })
            .then((data) => {
                var array = []
                const result = data.map((item, index) => {
                    return item.items
                })
                for (var i = 0; i < result.length; i++) {
                    result[i].map((item, index) => {
                        return array.push(item)
                    })
                }
                const kq = array.filter((item, index) => {
                    return item.status_transport == "Hoàn thành"
                })
                res.json(kq)
            })
            .catch((error) => {
                res.status(500).json("Loi ben server")
            })
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/user/cancel", function (req, res, next) {
    const token = req.body.token
    const user_id = jwt.verify(token, "123")
    try {
        OrderModel.find({
            $and: [
                { user_id: user_id }, { status: { $nin: ["00", "100"] } }
            ]
        })
            .then((data) => {
                var array = []
                const result = data.map((item, index) => {
                    return item.items
                })
                for (var i = 0; i < result.length; i++) {
                    result[i].map((item, index) => {
                        return array.push(item)
                    })
                }
                res.json(array)
            })
            .catch((error) => {
                res.status(500).json("Loi ben server")
            })
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/update_receive", async function (req, res, next) {
    const token = req.body.token
    const id = req.body.id
    const user_id = jwt.verify(token, "123")
    const status_transport = "Hoàn thành"
    const quantity = req.body.quantity
    const name = req.body.name
    const update_receive = await OrderModel.updateOne({
        $and: [{ user_id: user_id }, { "items._id": id }]
    },
        { $set: { "items.$[elem].status_transport": status_transport } },
        {
            arrayFilters: [{ "elem._id": id }]
        })
        .then((data) => {
            res.json("thanh cong")
        })
        .catch((err) => {
            console.log(err)
        })

    const result = update_receive
    const update_sold = await ProductModel.findOneAndUpdate({
        name: name
    }, { $inc: { sold: quantity } })
    const kq = update_sold

})
router.get("/total_orders", async function (req, res, next) {
    try {
        const request = await OrderModel.find({})
        const result = request.length
        res.json(result)
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
module.exports = router