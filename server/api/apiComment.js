/** @format */
const express = require("express");
const router = express.Router();
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const AccountModel = require("../model/Account");
const CommentModel = require("../model/Comment");
const ProductModel = require("../model/Product");
const jwt = require("jsonwebtoken")
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../project/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });
app.use(cookieParser());
router.post("/getName", function (req, res, next) {
    const token = req.body.token;
    const id = jwt.verify(token, "123");
    AccountModel.findOne({
        _id: id,
    })
        .then((data) => {
            if (data) {
                res.json({
                    success: true,
                    data: data.name,
                });
            }
        })
        .catch(() => {
            console.log("loi ben server");
        });
});
router.post("/post", upload.array("images", 5), async function (req, res, next) {
    var arrayFile = req.files;
    var array = [];
    arrayFile.forEach((item, index) => {
        return array.push(item.filename)
    })
    const {
        name_product,
        rating_star,
        rating_star_buy,
        rating_star_transport,
        uses,
        message,
        type_name,
        timeY_M_D,
        timeH_M,
        token,
        img
    } = req.body;
    const user_id = jwt.verify(token, "123")
    const user = await AccountModel.findOne({
        _id: user_id
    })
    const avatar = user.avatar
    const user_name = user.name
    CommentModel.create({
        img: img,
        name_product: name_product,
        rating_star: rating_star,
        rating_star_buy: rating_star_buy,
        rating_star_transport: rating_star_transport,
        uses: uses,
        message: message,
        type_name: type_name,
        timeH_M: timeH_M,
        timeY_M_D: timeY_M_D,
        image: array,
        avatar: avatar,
        user_name: user_name,
    })
});
router.post("/delete", async function (req, res, next) {
    const id = req.body.id
    try {
        const request = await CommentModel.findByIdAndDelete({
            _id: id
        })
        const result = request
    } catch (error) {
        res.json("that bai")
    }
})
router.param("product", function (req, res, next, name) {
    ProductModel.find({
        name: name,
    })
        .then((data) => {
            if (data) {
                req.data = data;
                next();
            }
        })
        .catch(() => {
            res.json("loi ben server");
        });
});
router.post("/:product", async function (req, res, next) {
    try {
        const comment = await CommentModel.find({
            name_product: req.data[0].name,
        })
        const kq6 = comment.filter((item, index) => {
            return (item.image).length > 0
        })
        const kq5 = comment.filter((item, index) => {
            return item.rating_star == 4
        })
        const kq4 = comment.filter((item, index) => {
            return item.rating_star == 3
        })
        const kq3 = comment.filter((item, index) => {
            return item.rating_star == 2
        })
        const kq2 = comment.filter((item, index) => {
            return item.rating_star == 1
        })
        const kq1 = comment.filter((item, index) => {
            return item.rating_star == 0
        })
        const kq = comment.length
        res.json({
            star1: kq1.length,
            star2: kq2.length,
            star3: kq3.length,
            star4: kq4.length,
            star5: kq5.length,
            star6: kq6.length,
            star0: kq
        })
    } catch (error) {
        res.json(error)
    }
})
router.get("/:product", function (req, res, next) {
    const query = req.query
    const star = parseInt(query.star)
    if (star == 0) {
        CommentModel.find({
            name_product: req.data[0].name,
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }
    else if (star == 1) {
        CommentModel.find({
            $and: [{
                name_product: req.data[0].name
            }, { rating_star: 0 }]
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }
    else if (star == 2) {
        CommentModel.find({
            $and: [{
                name_product: req.data[0].name
            }, { rating_star: 1 }]
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }
    else if (star == 3) {
        CommentModel.find({
            $and: [{
                name_product: req.data[0].name
            }, { rating_star: 2 }]
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }
    else if (star == 4) {
        CommentModel.find({
            $and: [{
                name_product: req.data[0].name
            }, { rating_star: 3 }]
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }
    else if (star == 5) {
        CommentModel.find({
            $and: [{
                name_product: req.data[0].name
            }, { rating_star: 4 }]
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }
    else if (star == 6) {
        CommentModel.find({
            $and: [{
                name_product: req.data[0].name
            }, { image: { $not: { $size: 0 } } }]
        })
            .then((data) => {
                if (data) {
                    res.json({ data: data });
                } else {
                    res.json("ten san pham khong chinh xac");
                }
            })
            .catch(() => {
                res.json("loi ben server 123");
            });
    }

})
module.exports = router;
