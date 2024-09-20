"use client"
import styles from "./PageType.module.scss"
import classnames from "classnames/bind"
import "../../globals.css"
import Product from "@/app/Layout/newproducts/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/app/Layout/header/Header";
import Back from "@/app/Layout/back/Back";
import Footer from "@/app/Layout/footer";
const cx = classnames.bind(styles)
function LayoutPageType({ type, value, title }) {
    const [data, setData] = useState([]);
    const [url, setUrl] = useState(localStorage.getItem(`url-${value}`) || '')
    const [loader, setLoader] = useState(false)
    const changeSelect = function (e) {
        setUrl(e.target.value)
        window.location.reload()
    }
    useEffect(() => {
        localStorage.setItem(`url-${value}`, url)
    }, [url])
    useEffect(() => {
        async function fetchData() {
            try {
                const responsive = await axios({
                    method: "post",
                    url: `http://localhost:4000/products-type/${url}`,
                    data: {
                        type: type
                    }
                })
                setData(responsive.data)
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
        return <p>...loader</p>
    }
    return (
        <>
            <Header />
            <div className={cx("wrapper", "mx-10", "px-24")}>
                <div className={cx("title", "pt-12")}>
                    <p className={cx('my-5')}>{title}</p>
                    <span className={cx("block", 'text-center', "mb-3")}>({data.length} sản phẩm)</span>
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
            </div>
            <Back />
            <Footer />
        </>

    );
}

export default LayoutPageType;