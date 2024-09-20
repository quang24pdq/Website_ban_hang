/** @format */

"use client";
import Header from "@/app/Layout/header/Header";
import styles from "./OrderCustom.module.scss";
import classnames from "classnames/bind";
import "../../globals.css";
import Cookies from "js-cookie"
import { IconSearch } from "./Icon";
import Footer from "@/app/Layout/footer";
import Navigation from "./Navigation";
import Order from "./Order";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import OrderWaitPay from "./all_option/WaitPayment";
import Transport from "./all_option/Transport";
import Complete from "./all_option/Complete";
import Cancel from "./all_option/Cancel";
const cx = classnames.bind(styles);
function OrderCustom() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [value, setValue] = useState(1)
    const elementRef = useRef(null)
    const fetchData = async () => {
        const request = await axios({
            method: "post",
            url: "http://localhost:4000/order/user",
            data: {
                token: Cookies.get("token"),
                page_number: page
            }
        })
        if (request.data.length == 0) {
            setHasMore(false)
        }
        else {
            setData([...data, ...request.data]);
            setPage(prev => prev + 1)
        }
    }
    const onIntersection = function (entry) {
        const firstEntry = entry[0];
        if (firstEntry.isIntersecting && hasMore) {
            setTimeout(() => {
                fetchData()
            }, 500)
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
    }, [data])
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <Navigation options={setValue} />
                    <div className={cx("search")}>
                        <IconSearch />
                        <input
                            aria-label=''
                            role='search'
                            autoComplete='off'
                            placeholder='Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm'
                        />
                    </div>

                    <div className={cx("order")}>
                        {value == 1 && <Order data={data} />}
                        {value == 2 && <OrderWaitPay />}
                        {value == 3 && < Transport />}
                        {value == 4 && <Complete />}
                        {value == 5 && <Cancel />}
                        {hasMore && <div style={{
                            display: "flex",
                            justifyContent: "center"
                        }} ref={elementRef}><div className={cx("loader")}></div></div>}
                    </div>
                </div>
            </div>
            <Footer line={false} />
        </div >
    );
}

export default OrderCustom;
