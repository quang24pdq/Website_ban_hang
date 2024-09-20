"use client"
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import classnames from "classnames/bind"
import styles from "../Order.module.scss"
import axios from "axios";
const cx = classnames.bind(styles)
function SortStatus({ setData, condition }) {
    const [hidden, setHidden] = useState(false)
    const [option, setOption] = useState("Chọn tình trạng")
    const handleSortSuccess = async function () {
        setOption("Thành công")
        setHidden(false)
        condition("Thành công")
    }
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios({
                method: "post",
                url: "http://localhost:4000/order/sort-status",
                data: {
                    condition: option
                }
            })
            const result = request.data
            setData(result)
        }
        fetchData()
    }, [option])
    return (
        <>
            <div onClick={() => {
                setHidden(true)
            }} className={cx("options", "flex", "items-center")}>
                {option}
                <span style={{ fontSize: "20px" }} className={cx("arrow", "ml-6")}><MdOutlineKeyboardArrowDown /></span>
            </div>
            <ul style={hidden ? { visibility: "visible" } : {}} className={cx("list-options", "absolute")}>
                <li style={(option == "Thành công") ? { display: "none" } : { display: "block" }} onClick={handleSortSuccess} className={cx("option")}>Thành công</li>
                <li style={(option == "Thất bại") ? { display: "none" } : { display: "block" }} onClick={() => {
                    setHidden(false)
                    setOption("Thất bại")
                    condition("Thất bại")
                }} className={cx("option")}>Thất bại</li>
                {(option != "Chọn tình trạng") && <li onClick={() => {
                    setHidden(false)
                    setOption("Chọn tình trạng")
                    condition("Chọn tình trạng")
                }} className={cx("option")}>Tất cả</li>}
            </ul>
        </>
    );
}

export default SortStatus;