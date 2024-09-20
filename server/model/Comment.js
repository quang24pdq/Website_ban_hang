const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user')
const Schema = mongoose.Schema;

const Comment = new Schema({
    name_product: String,
    avatar: String,
    image: Array,
    like: Boolean,
    can_remove: Boolean,
    can_like: Boolean,
    can_comment: Boolean,
    rating_star: Number,
    rating_star_buy: Number,
    rating_star_transport: Number,
    uses: String,
    message: String,
    type_name: String,
    timeY_M_D: String,
    timeH_M: String,
    user_name: String,
    img: String,
}, {
    collection: "Comment"
});
const CommentModel = mongoose.model("comment", Comment)
module.exports = CommentModel;