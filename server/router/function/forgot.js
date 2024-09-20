const express = require("express")
const app = express()
const router = express.Router()
const Mailjet = require('node-mailjet');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const AccountModel = require("../../model/Account");
const MJ_APIKEY_PUBLIC = "f9a5786c6ffc05d15e6f8215913416cd";
const MJ_APIKEY_PRIVATE = "e6aec2fea3c2de64795aeaf4cd7781b8"
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const forgetPassword = function (req, res, next) {
    const email = req.body.email
    const mailjet = Mailjet.connect(
        MJ_APIKEY_PUBLIC,
        MJ_APIKEY_PRIVATE,
    );
    AccountModel.findOne({
        email: email
    })
        .then((data) => {
            if (data) {
                const request = mailjet
                    .post('send', { version: 'v3.1' })
                    .request({
                        Messages: [
                            {
                                From: {
                                    Email: "thaibinhbuiduc@gmail.com",
                                    Name: "Shop Bui Nam"
                                },
                                To: [
                                    {
                                        Email: email,
                                        Name: email
                                    }
                                ],
                                Subject: "Your email flight plan!",
                                TextPart: "It seems like you forgot your password for [customer portal]. If this is true, click the link below to reset your password",
                                HTMLPart: "<h3> Reset my password  <a href=\"http://localhost:5000/function/forgot/updatePass\">Forget PassWord</a>!</h3><br />  If you did not forget your password, please disregard this email.!"
                            }
                        ]
                    })
                res.json({
                    data,
                    request,
                    success: true
                })
            }
            else {
                res.json({
                    message: "Email không tồn tại"
                })
            }
        })
        .catch((err) => {
            res.status(500).json("Loi ben server")
        })
}
router.post("/", forgetPassword)
router.post("/updatePassword", function (req, res, next) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email;
    let encryptedPassword = ""
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            encryptedPassword = hash
            AccountModel.findOneAndUpdate({
                email: email
            }, {
                password: encryptedPassword,
                confirmPassword: encryptedPassword
            })
                .then((data) => {
                    res.json({
                        message: "Đổi mật khẩu thành công"
                    })
                })
        });
    });
})
module.exports = router