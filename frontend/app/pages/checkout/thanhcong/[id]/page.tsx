"use client"
import classnames from "classnames/bind"
import { useRouter } from "next/navigation"
import styles from "../SuccessCheckout.module.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
const cx = classnames.bind(styles)
function SuccessCheckout({ params }: { params: { id: string } }) {
    const router = useRouter()
    const responsive = params.id.split("-")
    const return_cart = sessionStorage.getItem("cart")
    const cart = JSON.parse(return_cart)
    const return_info = sessionStorage.getItem("info")
    const info = JSON.parse(return_info)
    const dateString = responsive[3];
    const year = (dateString.slice(0, 4));
    const month = (dateString.slice(4, 6)); // Tháng trong JavaScript là từ 0 đến 11
    const day = (dateString.slice(6, 8));
    const hours = (dateString.slice(8, 10));
    const minutes = (dateString.slice(10, 12));
    const seconds = (dateString.slice(12, 14));
    const dateObject = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
    const amount = Number(responsive[0])
    const [checkDelete, setCheckDelete] = useState(false)
    cart.map((item, index) => {
        return item.status_transport = "Đang giao hàng"
    })

    const data = {
        full_name: info.full_name,
        address: info.address,
        email: info.email,
        phone: info.phone,
        user_id: Cookies.get("token"),
        total_order: Number(responsive[0]) / 100,
        pay_date: dateObject,
        bank_code: responsive[1],
        status: responsive[4],
        code: responsive[2],
        items: cart,
    }
    useEffect(() => {
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
            finally {
                setCheckDelete(true)
            }

        }
        window.addEventListener('load', requestApi);
        return () => {
            window.removeEventListener('load', requestApi);
        };
    }, []);
    useEffect(() => {
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
        deleteCart()
    }, [checkDelete])
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <h3 className={cx("title")}>VNPAY</h3>
                <div className={cx("btn")}>
                    <button onClick={() => {
                        router.push("/pages/checkout")
                    }} className={cx("btn-create")}>Tạo mới GD thanh toán</button>
                </div>
            </div>

            <div className={cx("notify")}>Thanh toán thành công</div>
        </div>
    )
}
export default SuccessCheckout