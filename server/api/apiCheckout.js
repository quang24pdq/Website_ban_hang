let express = require('express');
let router = express.Router();
let $ = require('jquery');
const moment = require('moment');
const request = require('request');
router.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var dateFormat = require('dateformat');


    let tmnCode = 'RK7M653G';
    let secretKey = "FQERXZUFLCRWNDUUVNPMGHNUEYAIELRM";
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "http://localhost:4000/checkout/vnpay_return";

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    const currentTime = moment();

    // Thêm một khoảng thời gian, ví dụ: 30 phút
    const expireTime = currentTime.add(40, 'minutes');

    // Định dạng thời gian theo định dạng yêu cầu của VNPAY (yyyyMMddHHmmss)
    const formattedExpireTime = expireTime.format('YYYYMMDDHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_ExpireDate'] = formattedExpireTime;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.json(vnpUrl)
});
router.get('/vnpay_return', function (req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let tmnCode = 'RK7M653G';
    let secretKey = "FQERXZUFLCRWNDUUVNPMGHNUEYAIELRM";


    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");


    const code = Number(vnp_Params.vnp_ResponseCode)
    const urlPrams = req.query.vnp_Amount + "-" + req.query.vnp_BankCode + "-" + req.query.vnp_TransactionNo + "-" + req.query.vnp_PayDate + '-' + req.query.vnp_ResponseCode
    if (code === 0) {
        res.redirect("http://localhost:5000/pages/checkout/thanhcong" + "/" + urlPrams)
    }
    else {
        res.redirect("http://localhost:5000/pages/checkout/thatbai" + "/" + urlPrams)
    }

});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = router;