const express = require("express")
const app = express();
var cors = require('cors')
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const checkLogin = require("./router/function/checkLogin")
const router1 = require("./router/function/register")
const router2 = require('./router/function/login')
const router4 = require('./router/function/forgot')
const apiComment = require("./api/apiComment")
const apiProduct = require("./api/apiProduct")
const apiNewProducts = require("./api/apiNewProducts")
const routerSearch = require("./api/apiSearch")
const apiCart = require("./api/apiCart")
const apiAccount = require("./api/apiAccount")
const apiCheckout = require("./api/apiCheckout")
const apiOrder = require("./api/apiOrder")
const apiReport = require("./api/apiReport")
const apiProductType = require("./api/apiProductType")
var bodyParser = require('body-parser')
const AccountModel = require("./model/Account")
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// online
const http = require("http").Server(app)
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:5000']
    }
});
io.on("connection", async function (socket) {
    const token = socket.handshake.auth.token
    if (token) {
        const id = jwt.verify(token, "123")._id
        try {
            const request = await AccountModel.findOneAndUpdate({
                _id: id
            }, {
                online: true
            })
            const result = request
        }
        catch (err) {
            console.log(err)
        }
    }
    socket.on("disconnect", async function () {
        if (token) {
            const id = jwt.verify(token, "123")
            try {
                const request = await AccountModel.findOneAndUpdate({
                    _id: id
                }, {
                    online: false
                })
                const result = request
            }
            catch (err) {
                console.log(err)
            }
        }
    })
})
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:5000' }));
app.use("/register", router1)
app.use("/login", router2)
app.use("/forgot", router4)
app.use("/api/products", apiProduct)
app.use("/api/newProducts", apiNewProducts)
app.use("/api/comments", apiComment)
app.use("/api/search", routerSearch)
app.use("/checkLogin", checkLogin)
app.use("/cart", apiCart)
app.use("/accounts", apiAccount)
app.use("/order", apiOrder)
app.use("/checkout", apiCheckout)
app.use("/report", apiReport)
app.use("/products-type", apiProductType)
http.listen(4000, function () {
    console.log("onchange port 4000")
})