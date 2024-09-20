const express = require("express");
const app = express()
const router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const AccountModel = require("../../model/Account.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
router.post("/", (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const full_name = req.body.full_name
    let encryptedPassword = ""
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            encryptedPassword = hash
            AccountModel.findOne({
                $or: [
                    { email: email },
                    { name: name }
                ]
            })
                .then((data) => {
                    if (data) {
                        res.json({
                            message: "Email or Name already exists",
                            success: false,
                        })
                    }
                    else {
                        AccountModel.create({
                            name: name,
                            email: email,
                            password: encryptedPassword,
                            confirmPassword: encryptedPassword,
                            full_name: full_name,
                            online: false
                        })
                        res.json({
                            message: "Registered successfully",
                            success: true
                        })
                    }
                })
                .catch((error) => {
                    res.json("loi server")
                })
        });
    });
})
module.exports = router