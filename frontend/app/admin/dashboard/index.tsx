"use client"
import axios from "axios";
import styles from "./Dashboard.module.scss"
import classnames from "classnames/bind"
import { useEffect, useState } from "react";
const cx = classnames.bind(styles)
import { AiOutlineFileText, AiOutlineFileDone, AiTwotoneTags } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import DashboardChart from "./DashboardChart";
function Dashboard({ turnOn }) {
    const [online, setOnline] = useState(null)
    const [users, setUsers] = useState(null)
    const [products, setProducts] = useState(null)
    const [orders, setOrders] = useState(null)
    const date = new Date()
    const data = [
        {
            "name": date.getDate() - 6 + "/" + date.getMonth() + 1,
            "Lượt truy cập": 10,
        },
        {
            "name": date.getDate() - 5 + "/" + date.getMonth() + 1,
            "Lượt truy cập": 5,
        },
        {
            "name": date.getDate() - 4 + "/" + date.getMonth() + 1,
            "Lượt truy cập": 6,
        },
        {
            "name": date.getDate() - 3 + "/" + date.getMonth() + 1,
            "Lượt truy cập": 9,
        },
        {
            "name": date.getDate() - 2 + "/" + date.getMonth() + 1,
            "Lượt truy cập": 12,
        },
        {
            "name": (date.getDate() - 1) + "/" + date.getMonth() + 1,
            "Lượt truy cập": 14,
        },
        {
            "name": date.getDate() + "/" + date.getMonth() + 1,
            "Lượt truy cập": 4,
        }
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios({
                    method: "get",
                    url: "http://localhost:4000/accounts/total_online",
                })
                const result = request.data
                setOnline(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        const fetchDataUsers = async () => {
            try {
                const request = await axios({
                    method: "get",
                    url: "http://localhost:4000/accounts/total_users",
                })
                const result = request.data
                setUsers(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataUsers()
        const fetchDataProducts = async () => {
            try {
                const request = await axios({
                    method: "get",
                    url: "http://localhost:4000/api/products/total_products",
                })
                const result = request.data
                setProducts(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataProducts()
        const fetchDataOrders = async () => {
            try {
                const request = await axios({
                    method: "get",
                    url: "http://localhost:4000/order/total_orders",
                })
                const result = request.data
                setOrders(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataOrders()
    }, [])
    return (
        <div style={turnOn ? { visibility: "visible" } : { visibility: "hidden" }} className={cx("wrapper")}>
            <header>
                <div className={cx("grid", "gap-6", "grid-cols-12")}>
                    <div className={cx("users", "shared", "col-span-3")}>
                        <div className={cx("title")}>
                            <span>{users}</span>
                            <p>Registered User</p>
                            <text>Total number of users</text>
                        </div>
                        <div className={cx("icon")}>
                            <AiOutlineFileText />
                        </div>
                    </div>
                    <div className={cx("products", "shared", "col-span-3")}>
                        <div className={cx("title")}>
                            <span>{products}</span>
                            <p>Product</p>
                            <text>Total number of products</text>
                        </div>
                        <div className={cx("icon")}>
                            <AiTwotoneTags />
                        </div>
                    </div>
                    <div className={cx("orders", "shared", "col-span-3")}>
                        <div className={cx("title")}>
                            <span>{orders}</span>
                            <p>Order</p>
                            <text>Total number of orders</text>
                        </div>
                        <div className={cx("icon")}>
                            <AiOutlineFileDone />
                        </div>
                    </div>
                    <div className={cx("online", "shared", "col-span-3")}>
                        <div className={cx("title")}>
                            <span>{online}</span>
                            <p>Online users</p>
                            <text>Total Online Users</text>
                        </div>
                        <div className={cx("icon")}>
                            <BsFillPeopleFill />
                        </div>
                    </div>
                </div>
            </header>
            <DashboardChart />
        </div>
    );
}

export default Dashboard;