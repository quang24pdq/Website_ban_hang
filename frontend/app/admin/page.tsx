/** @format */
"use client"
import styles from "./Admin.module.scss";
import classnames from "classnames/bind";
import { BsBoxArrowInRight } from "react-icons/bs";
import { FaHandHoldingUsd, FaTags } from "react-icons/fa";
import { AiOutlineSetting, AiOutlineFileDone, AiOutlineDashboard, AiOutlineUsergroupAdd, AiOutlineCarryOut } from "react-icons/ai";
import AccountCustom from "./accountCustom";
import "../globals.css";
import { useState } from "react";
import Products from "./Product/index";
import Order from "./order";
import Dashboard from "./dashboard/index";
import Report from "./report";
const cx = classnames.bind(styles);
function Admin() {
    const [accountCustom, setAccountCustom] = useState(false)
    const [product, setProduct] = useState(false)
    const [order, setOrder] = useState(false)
    const [dashboard, setDashboard] = useState(true)
    const [report, setReport] = useState(false)
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <button className={cx("icon-exit")}>
                    <BsBoxArrowInRight />
                </button>
            </div>
            <div className={cx("taskbar", "px-8")}>
                <div className={cx("info")}>
                    <div className={cx("avatar")}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDYH82uRG9d7V--6aIZwTor3TKTfWTVJe1cw&usqp=CAU"
                            alt='avatar'
                        />
                    </div>
                    <span className={cx("name")}>Bùi Nam</span>
                    <span className={cx("welcome")}>Chào mừng bạn trở lại</span>
                </div>

                <div className={cx("navigation")}>
                    <ul className={cx("list-items")}>
                        <li onClick={() => {
                            setAccountCustom(true)
                            setProduct(false)
                            setOrder(false)
                            setDashboard(true)
                            setReport(false)
                        }} tabIndex={0} className={cx("item")}>
                            <span className={cx("icon-item")}><AiOutlineDashboard /></span>
                            <span className={cx("action")}>Bảng điều khiển</span>
                        </li>
                        <li onClick={() => {
                            setAccountCustom(true)
                            setProduct(false)
                            setOrder(false)
                            setDashboard(false)
                            setReport(false)
                        }} tabIndex={0} className={cx("item")}>
                            <span className={cx("icon-item")}><AiOutlineUsergroupAdd /></span>
                            <span className={cx("action")}>Quản lí khách hàng</span>
                        </li>
                        <li onClick={() => {
                            setAccountCustom(false)
                            setProduct(true)
                            setOrder(false)
                            setDashboard(false)
                            setReport(false)
                        }} tabIndex={0} className={cx("item")}>
                            <span className={cx("icon-item")}><FaTags /></span>
                            <span className={cx("action")}>Quản lí sản phẩm</span>
                        </li>
                        <li onClick={() => {
                            setOrder(true)
                            setAccountCustom(false)
                            setProduct(false)
                            setDashboard(false)
                            setReport(false)
                        }} tabIndex={0} className={cx("item")}>
                            <span className={cx("icon-item")}><AiOutlineCarryOut /></span>
                            <span className={cx("action")}>Quản lí đơn hàng</span>
                        </li>
                        <li onClick={() => {
                            setAccountCustom(false)
                            setProduct(false)
                            setOrder(false)
                            setDashboard(false)
                            setReport(true)
                        }} tabIndex={0} className={cx("item")}>
                            <span className={cx("icon-item")}>< AiOutlineFileDone /></span>
                            <span className={cx("action")}>Báo cáo doanh thu</span>
                        </li>
                        <li tabIndex={0} className={cx("item")}>
                            <span className={cx("icon-item")}>< AiOutlineSetting /></span>
                            <span className={cx("action")}>Cài đặt hệ thống</span>
                        </li>
                    </ul>
                </div>
            </div>
            <AccountCustom turnOn={accountCustom} />
            <Products turnOn={product} />
            <Order turnOn={order} />
            <Dashboard turnOn={dashboard} />
            <Report turnOn={report} />
        </div>
    );
}

export default Admin;
