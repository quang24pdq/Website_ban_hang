const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user')
const Schema = mongoose.Schema;

const Account = new Schema({
    name: String,
    full_name: String,
    email: String,
    password: String,
    confirmPassword: String,
    avatar: String,
    online: Boolean,
    cart: [
        {
            name_product: String,
            price: Number,
            image: String,
            size: String,
            color: String,
            quantity: Number
        }
    ]
}, {
    collection: "Account"
});
const AccountModel = mongoose.model("account", Account)
module.exports = AccountModel;