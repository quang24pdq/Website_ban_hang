const express = require('express')
const app = express()
const router = express.Router()
const AccountModel = require("../model/Account")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// begin account admin
router.get("/", async (req, res, next) => {
    const query = req.query
    const page = parseInt(query.page)
    const page_size = 6
    try {
        AccountModel.find({})
            .skip((page - 1) * page_size)
            .limit(page_size)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err)
            })
    } catch (error) {
        res.json(error)
    }
})
router.post("/findAccount", async function (req, res, next) {
    const value = req.body.value
    try {
        const result = await AccountModel.find({
            $or: [{ email: value }, { name: value }]
        })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
router.post("/delete", async (req, res, next) => {
    const id = req.body.id
    try {
        const deleteAccount = await AccountModel.findOneAndRemove({
            _id: id
        })
        const result = deleteAccount
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/update", async (req, res, next) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const full_name = req.body.full_name
    let encryptedPassword = ""
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            encryptedPassword = hash
            try {
                const result = await AccountModel.findByIdAndUpdate(id, {
                    name: name,
                    password: encryptedPassword,
                    email: email,
                    confirmPassword: encryptedPassword,
                    full_name: full_name
                })
                const kq = result
                res.json({
                    data: kq,
                    message: "Cap nhat thanh cong",
                    success: true
                })
            } catch (error) {
                res.json({
                    success: false,
                    message: "Cap nhat that bai"
                })
            }
        });
    });

})
router.post("/offline", function (req, res, next) {
    const token = req.body.token
    if (token) {
        const id = jwt.verify(token, "123")
        AccountModel.findOneAndUpdate({
            _id: id
        }, {
            online: false
        })
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                res.json(error)
            })
    }
})
router.get("/total_online", async function (req, res, next) {
    try {
        const request = await AccountModel.find({})
        const result = request
        const arrayOnline = result.filter((item, index) => {
            return item.online === true
        })
        res.json(arrayOnline.length)
    } catch (error) {

    }
})
router.get("/total_users", async function (req, res, next) {
    try {
        const request = await AccountModel.find({})
        const result = request.length
        res.json(result)
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
// end code account admin


//code customers
router.post("/update_info", async function (req, res, next) {
    const token = req.body.token
    const name = req.body.name
    const avatar = req.body.avatar
    const full_name = req.body.full_name
    const id = jwt.verify(token, "123")
    try {
        if (!full_name) {
            if (avatar) {
                const request = await AccountModel.findOneAndUpdate({
                    _id: id
                }, {
                    avatar: avatar
                })
                const result = request
            }
            else if (avatar && name) {
                const request = await AccountModel.findOneAndUpdate({
                    _id: id
                }, {
                    name: name,
                    avatar: avatar
                })
                const result = request
            }
        }
        else if (full_name) {
            const request = await AccountModel.findOneAndUpdate({
                _id: id
            }, {
                name: name,
                full_name: full_name,
                avatar: avatar
            })
            const result = request
        }

    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/update_password", async (req, res, next) => {
    const token = req.body.token
    const password = req.body.password
    const newPassword = req.body.newPassword
    const id = jwt.verify(token, "123")
    let encryptedPassword = ""
    try {
        const request = await AccountModel.findOne({
            _id: id
        })
        if (request) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(newPassword, salt, function (err, hash) {
                    encryptedPassword = hash
                    bcrypt.compare(password, request.password, async function (err, result) {
                        if (result) {
                            const request = await AccountModel.findOneAndUpdate({
                                _id: id
                            }, {
                                password: encryptedPassword,
                                confirmPassword: encryptedPassword
                            })
                            res.json({
                                message: "Cập nhật thành công",
                                success: true
                            })
                        }
                    });
                });
            });
        }
        else {
            res.json({
                message: "Mật khẩu cũ không chính xác",
                success: false
            })
        }
    } catch (error) {
        res.status(500).json("Loi ben server")
    }

})
router.post("/update_email", async (req, res, next) => {
    const token = req.body.token
    const password = req.body.password
    const email = req.body.email
    const newEmail = req.body.newEmail
    const id = jwt.verify(token, "123")
    try {
        const request = await AccountModel.findOneAndUpdate({
            $and: [
                { _id: id }, { password: password }, { email: email }
            ]
        }, {
            email: newEmail
        })
        if (request) {
            res.json({
                message: "Cập nhật thành công",
                success: true
            })
        }
        else {
            res.json({
                message: "Email hoặc mật khẩu  không chính xác",
                success: false
            })
        }
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
router.post("/avatar", async (req, res, next) => {
    const token = req.body.token
    const id = jwt.verify(token, "123")
    try {
        const request = await AccountModel.findOne({
            _id: id
        })
        const result = request
        res.json(result.avatar)
    } catch (error) {
        res.status(500).json("Loi ben server")
    }
})
// end account customs
module.exports = router
// try {
//     const request = await AccountModel.findOneAndUpdate({
//         $and: [
//             { _id: id }, { password: password }
//         ]
//     }, {
//         password: newPassword,
//         confirmPassword: newPassword
//     })
//     if (request) {
//         res.json({
//             message: "Cập nhật thành công",
//             success: true
//         })
//     }
//     else {
//         res.json({
//             message: "Mật khẩu cũ không chính xác",
//             success: false
//         })
//     }
// } catch (error) {
//     res.status(500).json("Loi ben server")
// }