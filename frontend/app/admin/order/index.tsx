"use client"
import classnames from "classnames/bind"
import styles from "./Order.module.scss"
import { AiFillSetting } from "react-icons/ai";
import { BsArrowCounterclockwise, BsSearch } from "react-icons/bs";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import TableOrder from "./tableOrder";
import SortStatus from "./sort/SortStatus";
import DetailOrder from "./detail";
import PaginatedItems from "../pagenation";
const cx = classnames.bind(styles)
function Order({ turnOn }) {
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [value, setValue] = useState("")
    const [valueDate, setValueDate] = useState(null)
    const [load, setLoad] = useReducer(x => x + 1, 0)
    const [detailOrder, setDetailOrder] = useState(null)
    const [visible, setVisible] = useState(false)
    const [condition, setCondition] = useState("Chọn tình trạng")
    const [length, setLength] = useState(0)
    const [page, setPage] = useState(1)
    const time = new Date(valueDate)
    const changDate = (e) => {
        setValueDate(e.target.value)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestApi = await axios({
                    method: "get",
                    url: `http://localhost:4000/order?page=${page}`
                })
                const result = requestApi.data
                setData(result)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [load])
    const handleSearchDate = async () => {
        try {
            const fetchDataAll = async () => {
                const request = await axios({
                    method: "post",
                    url: "http://localhost:4000/order/sort-date",
                    data: {
                        date: time
                    }
                })
                const result = request.data
                setData(result)
            }
            const fetchDataDateStatus = async () => {
                const request = await axios({
                    method: "post",
                    url: "http://localhost:4000/order/sort-date_status",
                    data: {
                        condition: condition,
                        date: time
                    }
                })
                const result = request.data
                setData(result)
            }
            if (condition == "Chọn tình trạng") {
                fetchDataAll()
            }
            else {
                fetchDataDateStatus()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = async function () {
        try {
            const request = await axios({
                method: "post",
                url: "http://localhost:4000/order/search-order",
                data: {
                    code: value
                }
            })
            const result = request.data
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLoad = function () {
        setLoad()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestApi = await axios({
                    method: "get",
                    url: "http://localhost:4000/order/total_orders"
                })
                const result = requestApi.data
                setLength(result)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [])
    if (!loader) {
        return <p>....Loader</p>
    }
    return (
        <div style={turnOn ? { visibility: "visible" } : { visibility: "hidden" }} >
            <div className={cx("details_order", {
                "visibility": visible
            })}>
                <DetailOrder visible={setVisible} data={detailOrder} />
            </div>
            <div className={cx("container", {
            })}>
                <div className={cx("wrapper")}>
                    <h3 className={cx('title', "text-xl", "font-bold")}>Danh sách đơn hàng</h3>
                    <div className={cx("actions", "mt-8", "flex", "justify-between")}>
                        <div className={cx("action-left", "flex")}>
                            <div className={cx("action-search", "flex")}>
                                <input value={value} onChange={(e) => {
                                    if (e.target.value === " ") {
                                        return
                                    }
                                    else {
                                        setValue(e.target.value)
                                    }
                                }} className={cx("search")} type="search" placeholder="Nhập mã đơn hàng" />
                                <span className={cx("flex", "items-center", "justify-center")}><AiFillSetting /></span>
                            </div>
                            <button disabled={(value == "" ? true : false)} onClick={handleSearch} className={cx("btn-search")}>Tìm kiếm</button>
                            <button onClick={() => {
                                window.location.reload()
                            }} className={cx("btn-reload")}><BsArrowCounterclockwise /></button>
                        </div>
                        <div className={cx("action-right", "relative", "flex", "items-center")}>
                            <div className={cx("search-date", "flex", "items-center", "mr-8")}>
                                <input className={cx("date")} type="date" onChange={changDate} />
                                {valueDate && <button onClick={handleSearchDate}><BsSearch /></button>}
                            </div>
                            <SortStatus condition={setCondition} setData={setData} />
                        </div>
                    </div>
                    <TableOrder length={length} visible={setVisible} detailOrder={setDetailOrder} load={handleLoad} data={data} />
                </div>
                <PaginatedItems page={setPage} load={setLoad} itemsPerPage={3} length={length} />
            </div>
        </div>
    )
}

export default Order;