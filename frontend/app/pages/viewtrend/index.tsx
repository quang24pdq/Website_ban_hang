"use client"
import styles from "../latestproducts/LatestProducts.module.scss"
import classnames from "classnames/bind"
import Product from "@/app/Layout/newproducts/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../globals.css"
const cx = classnames.bind(styles)
function TrendView() {
    const [data, setData] = useState([]);
    const [url, setUrl] = useState(localStorage.getItem("url-trend") || '')
    const [loader, setLoader] = useState(false)
    const changeSelect = function (e) {
        setUrl(e.target.value)
        window.location.reload()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios({
                    method: "get",
                    url: `http://localhost:4000/api/products/trend/${url}`
                })
                const result = request.data
                setData(result)
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
        localStorage.setItem("url-trend", url)
    }, [url])
    if (!loader) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx("wrapper", "mx-10", "px-24")}>
            <div className={cx("title", "pt-12")}>
                <p className={cx('my-5')}>Top 20 Sản Phẩm Bán Chạy Nhất</p>
            </div>
            <div className={cx("sort")}>
                <span>Sắp xếp theo:</span>
                <select value={url} onChange={changeSelect} name="" id="">
                    <option value="">Tùy chọn </option>
                    <option value="increasesPrice">Giá: Tăng dần</option>
                    <option value="reducePrice">Giá: Giảm dần</option>
                    <option value="new">Mới nhất</option>
                </select>
            </div>
            <div className={cx("products", "mt-20", "gap-12", "grid", "grid-cols-12")}>
                {data.map((item, index) => {
                    return <div key={index} className={cx("col-span-3")}>
                        <Product index={index} data={item} />
                    </div>
                })
                }
            </div>

        </div>
    );
}

export default TrendView;