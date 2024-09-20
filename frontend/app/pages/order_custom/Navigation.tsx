/** @format */

"use client";
import { useState } from "react";
import styles from "./OrderCustom.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
function Navigation({ options }) {
    const [index, setIndex] = useState(1);
    return (
        <ul className={cx("navigation", "grid", "grid-cols-12")}>
            <li
                onClick={(e) => {
                    setIndex(1);
                    options(1)
                }}
                style={index == 1 ? { color: "#ee4d2d", borderBottom: "2px solid #ee4d2d" } : {}}
                className={cx("select", "col-span-2")}>
                Tất cả
            </li>
            <li
                style={index == 2 ? { color: "#ee4d2d", borderBottom: "2px solid #ee4d2d" } : {}}
                onClick={(e) => {
                    setIndex(2);
                    options(2)
                }}
                className={cx("select", "col-span-3")}>
                Chờ thanh toán
            </li>
            <li
                style={index == 3 ? { color: "#ee4d2d", borderBottom: "2px solid #ee4d2d" } : {}}
                onClick={(e) => {
                    setIndex(3);
                    options(3)
                }}
                className={cx("select", "col-span-3")}>
                Chờ giao hàng
            </li>
            <li
                style={index == 4 ? { color: "#ee4d2d", borderBottom: "2px solid #ee4d2d" } : {}}
                onClick={(e) => {
                    setIndex(4);
                    options(4)
                }}
                className={cx("select", "col-span-2")}>
                Hoàn thành
            </li>
            <li
                style={index == 5 ? { color: "#ee4d2d", borderBottom: "2px solid #ee4d2d" } : {}}
                onClick={(e) => {
                    setIndex(5);
                    options(5)
                }}
                className={cx("select", "col-span-2")}>
                Đã hủy
            </li>
        </ul>
    );
}

export default Navigation;
