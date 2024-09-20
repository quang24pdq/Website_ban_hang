const express = require('express');
const jwt = require("jsonwebtoken")
const app = express()
const router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const AccountModel = require("../../model/Account.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post("/", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        AccountModel.findOne({
            email: email,
            // password: password
        })
            .then((data) => {
                if (data) {
                    bcrypt.compare(password, data.password).then(function (result) {
                        if (result) {
                            const token = jwt.sign({
                                _id: data._id
                            }, "123")
                            return res.json({
                                message: "Logged in successfully",
                                success: true,
                                data: token,
                                user_name: data.name,
                                full_name: data.full_name,
                            })
                        }
                        else {
                            res.json({
                                message: "Email or password is incorrect",
                                success: false
                            })
                        }
                    });
                }
                else {
                    res.json({
                        message: "Email or password is incorrect",
                        success: false
                    })
                }
            })

            .catch((error) => {
                res.json(error)
            })
    } catch (error) {
        res.status(500).json("loi server")
    }
})
module.exports = router;