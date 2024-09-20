const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user')
const Schema = mongoose.Schema;
const Order = new Schema({
    user_id: String,
    full_name: String,
    address: String,
    email: String,
    total_order: Number,
    phone: String,
    pay_date: String,
    bank_code: String,
    status: String,
    date: Date,
    code: String,
    items: [
        {
            status_transport: String,
            name_product: String,
            quantity: Number,
            color: String,
            size: String,
            price: Number,
            image_default: String
        }
    ]
}, {
    collection: "Order"
});
const OrderModel = mongoose.model("order", Order)
module.exports = OrderModel;