/** @format */
"use client"
import { AiOutlineClose } from "react-icons/ai";
import classnames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie"
import axios from "axios";
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles);
function Cart({ visible, onClick, className, getAmount }) {
    const router = useRouter()
    const token = Cookies.get("token")
    const [hidden, setHidden] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useReducer(x => x + 1, 0)
    const handleDeleteCart = async function (item) {
        setUpdate()
        try {
            const requestApi = await axios({
                method: "post",
                url: "http://localhost:4000/cart/deleteCart",
                data: {
                    user_name: Cookies.get("user_name"),
                    id: item._id
                }
            })
            const result = requestApi
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckout = function () {
        onClick()
        setTimeout(() => {
            router.push("http://localhost:5000/pages/checkout")
        }, 1000)
    }
    const handleReduceCart = function (item) {
        setUpdate()
        axios({
            method: "post",
            url: "http://localhost:4000/cart/updateQuantity",
            data: {
                user_name: Cookies.get("user_name"),
                id: item._id,
                quantity: ((item.quantity) < 2) ? 1 : item.quantity - 1
            }
        })
    }
    const handleIncreaseCart = function (item) {
        axios({
            method: "post",
            url: "http://localhost:4000/cart/updateQuantity",
            data: {
                user_name: Cookies.get("user_name"),
                id: item._id,
                quantity: item.quantity + 1
            }
        })
        setUpdate()
    }
    useEffect(() => {
        setHidden(visible)
    }, [visible])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestApi = await axios({
                    method: "post",
                    url: "http://localhost:4000/checkLogin",
                    data: {
                        token: token
                    }
                })
                const result = requestApi.data
                setData(result)
                sessionStorage.setItem("cart", JSON.stringify(result.data.cart))
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [update])
    if (loading) {
        return <p>Loading...</p>
    }
    const result = data.data.cart.reduce((accument, current) => {
        const kq = accument + (current.price * current.quantity)
        if (getAmount) {
            getAmount(kq * 1000)
        }
        return kq
    }, 0)
    // const kqPrice = price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') + "₫"
    const kq = result.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') + "₫"
    return (
        <div className={cx("wrapper", "fixed", "top-0", "h-screen", "overflow-hidden", {
            "right-hidden": hidden,
            [className]: className
        })}>
            <div className={cx("content", "block")}>
                <div style={className ? {
                    padding: "0px 40px 0",
                } : {}} className={cx("all-list", "relative", "overflow-hidden", "min-h-full", "flex", "flex-col")}>
                    <p className={cx("title")}>Giỏ hàng</p>
                    <span className={cx("textCartSide")}>
                        Bạn đang có <b>{data.data.cart.length}</b> sản phẩm trong giỏ hàng.
                    </span>
                    <button onClick={onClick} className={cx("none-cart", "flex", "items-center", "justify-center", {
                        none: className
                    })}><AiOutlineClose style={{
                        color: "#121212",
                    }} /></button>
                    {data.data.cart.map((item, index) => {
                        return (
                            <div key={index} className={cx("cart-view")}>
                                <div className={cx("products", "flex")}>
                                    <div className={cx("image-product")}>
                                        <img
                                            src={item.color}
                                            alt='anh san pham'
                                        />
                                    </div>
                                    <div className={cx("detail")}>
                                        <p className={cx("name")}>{item.name_product}</p>
                                        <p className={cx("price")}>{item.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')}₫</p>
                                        {(item.size) ? <p className={cx("variant")}>size: {item.size}</p> : <p className={cx("variant")}></p>}

                                        <div className={cx("choose-quantity", "flex")}>
                                            <span className={cx("quantity", "flex", "items-center")}>Số lượng</span>
                                            <div className={cx("control-quantity")}>
                                                <span onClick={() => { handleReduceCart(item) }} className={cx("subs")}>-</span>
                                                <span className={cx("numbers")}>{item.quantity}</span>
                                                <span onClick={() => {
                                                    handleIncreaseCart(item)
                                                }} className={cx("add")}>+</span>
                                            </div>
                                        </div>
                                        <div className={cx("btn")} > <button onClick={() => { handleDeleteCart(item) }} className={cx("btn-delete")}>Xóa</button></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <span className={cx("line")}></span>
                    <div className={cx("total", "flex", "items-center", "justify-between")}>
                        <b className={cx("total-title")}>TỔNG TIỀN TẠM TÍNH:</b>
                        <span className={cx("total-price")}>{kq}</span>
                    </div>
                    <div className={cx("btn-view-cart", {
                        "none": className
                    })}>
                        <button onClick={handleCheckout}>Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
