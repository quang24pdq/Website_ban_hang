"use client"
import classnames from "classnames/bind"
import styles from './Checkout.module.scss'
import "../../globals.css"
import Cart from "@/app/Layout/cart/Cart"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
const cx = classnames.bind(styles)
function Pay() {
    const router = useRouter()
    const return_cart = sessionStorage.getItem("cart")
    const cart = JSON.parse(return_cart)
    cart.map((item, index) => {
        return item.status_transport = "Hủy giao hàng"
    })
    const [amount, setAmount] = useState(null)
    const getAmount = function (result) {
        setAmount(result)
    }
    const [check, setCheck] = useState(true)
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState('')
    const info = {
        full_name: fullName,
        address: address,
        phone: phone,
        email: email
    }
    var sevenDigitNumber = Math.floor(Math.random() * 10000000);
    var oneDigitNumber = Math.floor(Math.random() * 10);
    var eightDigitNumber = Number(sevenDigitNumber.toString() + oneDigitNumber.toString())
    const date = new Date();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const dateObject = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    const data = {
        full_name: info.full_name,
        address: info.address,
        email: info.email,
        phone: info.phone,
        user_id: Cookies.get("token"),
        total_order: amount,
        pay_date: dateObject,
        status: "100",
        code: eightDigitNumber,
        items: cart,
    }
    const handlePay = async function () {
        if (info.full_name && info.address && info.phone && info.email) {
            if (check) {
                try {
                    const callApi = await axios({
                        method: "post",
                        url: "http://localhost:4000/checkout/create_payment_url",
                        data: {
                            amount: amount,
                            bankCode: "VNBANK",
                            language: ""
                        }
                    })
                    const url = callApi.data
                    sessionStorage.setItem("info", JSON.stringify(info))
                    router.push(url)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                const requestApi = async () => {
                    try {
                        const postApi = await axios({
                            method: "post",
                            url: "http://localhost:4000/order",
                            data: data
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
                const deleteCart = async () => {
                    try {
                        const requestApi = await axios({
                            method: "post",
                            url: "http://localhost:4000/cart/deleteAll",
                            data: {
                                user_name: Cookies.get("user_name")
                            }
                        })
                        const result = requestApi
                    } catch (error) {
                        console.log(error)
                    }
                }
                requestApi()
                deleteCart()
                alert("Đơn hàng đã được đặt thành công")
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        }
        else {
            alert("Bạn chưa điền đủ thông tin")
        }

    }
    return (
        <div className={cx("wrapper")}>
            <button onClick={() => {
                router.push("/")
            }} className={cx("back")}>Quay lại trang chủ</button>
            <div className={cx("title")}>
                <h2>Thanh toán</h2>
                <p>Vui lòng kiểm tra thông tin Khách hàng,thông tin Giỏ hàng trước khi đặt hàng.</p>
            </div>
            <div className={cx("container")}>
                <form className={cx("form")}>
                    <h3>Thông tin khách hàng</h3>
                    <label htmlFor="name">Họ tên</label>
                    <input onChange={(e) => {
                        setFullName(e.target.value)
                    }} id="name" name="name" value={fullName} />
                    <label htmlFor="address">Địa chỉ</label>
                    <input onChange={(e) => {
                        setAddress(e.target.value)
                    }} id="address" name="address" value={address} />
                    <label htmlFor="sex">Giới tính</label>
                    <input id="sex" name="sex" />
                    <label htmlFor="phone">Điện thoại</label>
                    <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={(e) => {
                        setPhone(e.target.value)
                    }} id="phone" name="phone" value={phone} />
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} id="email" name="email" value={email} />
                    <label htmlFor="birthday">Ngày sinh</label>
                    <input id="birthday" name="birthday" />
                    <label htmlFor="CMND">CMND</label>
                    <input id="CMND" name="CMND" />
                </form>

                <div className={cx("cart")}> <Cart getAmount={getAmount} className="pay-cart" visible={true} /></div>

            </div>
            <h4 >Hình thức thanh toán</h4>

            <div className={cx("method-pay")}>
                <div className={cx("option")}>
                    <input
                        onClick={() => {
                            setCheck(true)
                        }}
                        checked={check}
                        readOnly
                        id="httt-1"
                        name="httt_ma"
                        type="radio"
                        required
                        value="1" />
                    <label htmlFor="httt-1">Chuyển khoản</label>
                </div>
                <div className={cx("option")}>
                    <input
                        readOnly
                        id="httt-2"
                        name="httt_ma"
                        type="radio"
                        required
                        checked={!check}
                        onClick={() => {
                            setCheck(false)
                        }}
                        value="2" />
                    <label htmlFor="httt-2">Tiền mặt</label>
                </div>
            </div>
            <hr />
            <button onClick={handlePay} className={cx("btn")}>
                Đặt hàng
            </button>
        </div>
    );
}

export default Pay;