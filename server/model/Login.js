const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user')
const Schema = mongoose.Schema;
const date = new Date()
const day1 = date.getDate() - 5 + "/" + date.getMonth() + 1
const day2 = date.getDate() - 5 + "/" + date.getMonth() + 1
const day3 = date.getDate() - 4 + "/" + date.getMonth() + 1
const day4 = date.getDate() - 3 + "/" + date.getMonth() + 1
const day5 = date.getDate() - 2 + "/" + date.getMonth() + 1
const day6 = date.getDate() - 1 + "/" + date.getMonth() + 1
const day7 = date.getDate() - 0 + "/" + date.getMonth() + 1
const Login = new Schema({
  day1: {
    time: String,
    quantity: Number
  },
  day2: {
    time: String,
    quantity: Number
  },
  day3: {
    time: String,
    quantity: Number
  },
  day4: {
    time: String,
    quantity: Number
  },
  day5: {
    time: String,
    quantity: Number
  },
  day6: {
    time: String,
    quantity: Number
  },
  day7: {
    time: String,
    quantity: Number
  },
}, {
  collection: "Login"
});
const LoginModel = mongoose.model("login", Login)
LoginModel.create({
  day1: {
    time: day1,
    quantity: 2
  },
  day2: {
    time: day2,
    quantity: 2
  },
  day3: {
    time: day3,
    quantity: 2
  },
  day4: {
    time: day4,
    quantity: 2
  },
  day5: {
    time: day5,
    quantity: 2
  },
  day6: {
    time: day6,
    quantity: 2
  },
  day7: {
    time: day7,
    quantity: 2
  },
})
module.exports = Login;



