const express = require('express');
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/user')
const { v4: uuidv4 } = require('uuid');
// Hàm tạo mã code và gán vào trường uniqueCode
const Schema = mongoose.Schema;
const Product = new Schema({
    uniqueCode: {
        type: String,
        unique: true,
    },
    entered: Number,
    import_price: Number,
    sold: Number,
    name: String,
    price: Number,
    priceSale: Number,
    type: String,
    imgDefault: String,
    imgHover: String,
    size: Array,
    color: [
        {
            imgColorDefault: String,
            background: String,
            imgColor: String
        },
    ],
    detail: {
        designs: String,
        quality: String,
        colorDetail: String,
        sizeDetail: String,
        origin: String,
        information: String,
        height: String
    }
}, {
    collection: "Product"
});
Product.pre('save', function (next) {
    if (!this.uniqueCode) {
        this.uniqueCode = uuidv4().substr(0, 6);
    }
    next();
});
const ProductModel = mongoose.model("Product", Product)
module.exports = ProductModel