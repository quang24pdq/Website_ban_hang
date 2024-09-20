"use client"
import classnames from "classnames/bind"
import styles from "./Products.module.scss"
import { AiFillSetting } from "react-icons/ai";
import { BsArrowCounterclockwise, BsPlusLg } from "react-icons/bs";
import Table from "./table/Table";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import PaginatedItems from "../pagenation";
const cx = classnames.bind(styles)
function Products({ turnOn }) {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [load, setLoad] = useReducer(x => x + 1, 0)
    const [value, setValue] = useState('')
    const [page, setPage] = useState(1)
    const [length, setLength] = useState(0)
    const handleReload = function () {
        setLoad()
    }
    const handleSearch = async function () {
        try {
            const requestApi = await axios({
                method: "post",
                url: "http://localhost:4000/api/products/findCode",
                data: {
                    code: value
                }
            })
            const result = requestApi.data
            if (result.length == 0) {
                alert("Không tìm thấy sản phẩm")
            }
            else {
                setData(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestApi = await axios({
                    method: "get",
                    url: "http://localhost:4000/api/products/total_products"
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestApi = await axios({
                    method: "get",
                    url: `http://localhost:4000/api/products?page=${page}`
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
    if (!loader) {
        return <p>....Loader</p>
    }
    return (
        <div className={cx("container", {
            "block": turnOn
        })}>
            <div className={cx("wrapper")}>
                <h3 className={cx('title', "text-xl", "font-bold")}>Danh sách sản phẩm</h3>
                <div className={cx("actions", "mt-8", "flex", "justify-between")}>
                    <div className={cx("action-left", "flex")}>
                        <div className={cx("action-search", "flex")}>
                            <input value={value} onChange={(e) => {
                                if (e.target.value === " ") {
                                    return
                                }
                                setValue(e.target.value)
                            }} className={cx("search")} type="search" placeholder="Nhập mã sản phẩm" />
                            <span className={cx("flex", "items-center", "justify-center")}><AiFillSetting /></span>
                        </div>
                        <button disabled={(value == "") ? true : false} onClick={handleSearch} className={cx("btn-search")}>Tìm kiếm</button>
                        <button onClick={() => {
                            window.location.reload()
                        }} className={cx("btn-reload")}><BsArrowCounterclockwise /></button>
                    </div>
                    <div className={cx("action-right")}>
                        <button onClick={() => {
                            router.push("/admin/Product/createProduct")
                        }} className={cx(('btn-add'))}>
                            <span> <BsPlusLg /></span>
                            Thêm mới
                        </button>
                    </div>
                </div>
                <Table length={length} load={handleReload} data={data} />
            </div>
            <PaginatedItems load={setLoad} length={length} page={setPage} itemsPerPage={8} />
        </div>
    );
}

export default Products;