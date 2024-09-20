const express = require("express")
const app = express()
var cookieParser = require('cookie-parser')
var jwt = require("jsonwebtoken")
var bodyParser = require('body-parser')
var AccountModel = require("../../model/Account")
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const router = express.Router()
const checkLogin = function (req, res, next) {
    const token = req.body.token;
    const result = jwt.verify(token, "123");
    AccountModel.findOne({
        _id: result,
    })
        .then((data) => {
            if (data) {
                res.json({
                    success: true,
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                message: "You need to be logged in to comment",
                success: false,
            });
        });
};
router.post("/", checkLogin)
module.exports = router