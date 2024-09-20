"use client"
import { useEffect, useState } from "react"
import styles from "./Statistical.module.scss"
import classnames from "classnames/bind"
import axios from "axios"
const cx = classnames.bind(styles)
function Statistical() {
    const [data, setData] = useState({})
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsive = await axios({
                    method: "get",
                    url: "http://localhost:4000/report"
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
        return <p>...Loader</p>
    }
    return (
        <header style={{ marginTop: "24px", marginBottom: "32px" }}>
            <div className={cx("grid", "gap-6", "grid-cols-12")}>
                <div className={cx("users", "shared", "col-span-4")}>
                    <div className={cx("title")}>
                        <p>Thực chi</p>
                        <span>{data.chi}đ</span>
                    </div>
                </div>
                <div className={cx("products", "shared", "col-span-4")}>
                    <div className={cx("title")}>
                        <p>Thực thu</p>
                        <span>{data.thu}đ</span>
                    </div>
                </div>
                <div className={cx("orders", "shared", "col-span-4")}>
                    <div className={cx("title")}>
                        <p>Số còn phải thu</p>
                        <span>{data.ban}đ</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Statistical;