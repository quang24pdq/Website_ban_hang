"use client"
import styles from "./LatestProducts.module.scss"
import classnames from "classnames/bind"
import Product from "@/app/Layout/newproducts/Product";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const cx = classnames.bind(styles)
const page_number = 1;
function LatestProduct({ onHidden }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(page_number)
    const [length, setLength] = useState()
    const [url, setUrl] = useState(localStorage.getItem("url") || '')
    const elementRef = useRef(null);
    const [hasMore, setHasMore] = useState(true)
    const changeSelect = function (e) {
        setUrl(e.target.value)
        window.location.reload()
    }
    useEffect(() => {
        localStorage.setItem("url", url)
    }, [url])
    async function fetchData() {
        const responsive = await axios({
            method: "post",
            url: `http://localhost:4000/api/newProducts/latestProducts/${url}`,
            data: {
                numberPage: page
            }
        })
        if (responsive.data.length == 0 || data.length == length) {
            onHidden()
            setHasMore(false)
        }
        else {
            setData([...data, ...responsive.data]);
            setPage(prev => prev + 1)
        }
    }
    const onIntersection = function (entries) {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore) {
            setTimeout(() => {
                fetchData()
            }, 400)
        }
    }
    const observer = new IntersectionObserver(onIntersection)
    useEffect(() => {
        if (observer && hasMore) {
            observer.observe(elementRef.current)
        }
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [data, url])
    useEffect(() => {
        axios.get("http://localhost:4000/api/newProducts/lengths")
            .then((data) => {
                setLength(data.data)
            })
    }, [])
    return (
        <div className={cx("wrapper", "mx-10", "px-24")}>
            <div className={cx("title", "pt-12")}>
                <p className={cx('my-5')}>Top Sản Phẩm Mới Nhất</p>
                <span className={cx("block", 'text-center', "mb-3")}>({length} sản phẩm)</span>
            </div>
            <div className={cx("sort")}>
                <span>Sắp xếp theo:</span>
                <select value={url} onChange={changeSelect} name="" id="">
                    <option value="">Tùy chọn </option>
                    <option value="increasesPrice">Giá: Tăng dần</option>
                    <option value="reducePrice">Giá: Giảm dần</option>
                    <option value="new">Mới nhất</option>
                    <option value="selling">Bán chạy nhất</option>
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
            {hasMore && <div style={{
                display: "flex",
                justifyContent: "center"
            }} ref={elementRef}><div className={cx("loader")}></div></div>}
        </div>
    );
}

export default LatestProduct;