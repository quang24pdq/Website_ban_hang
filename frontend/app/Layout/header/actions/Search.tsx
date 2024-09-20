/** @format */
"use client"
import TippyHeadless from '@tippyjs/react/headless';
import "tippy.js/dist/tippy.css";
import classnames from "classnames/bind";
import styles from "../Header.module.scss";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie"
const cx = classnames.bind(styles);
function Search() {
    const [value, setValue] = useState("")
    const [view, setView] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState(Cookies.get("value-search"))
    const close = function () {
        setView(false)
    }
    const open = function () {
        setView(true)
    }
    const handleChange = function (e) {
        if (e.target.value === " ") {
            return;
        }
        else {
            setValue(e.target.value)
            Cookies.set("value-search", e.target.value)
        }
    }
    useEffect(() => {
        axios({
            method: "post",
            url: "http://localhost:4000/api/search",
            data: {
                value: value
            }
        })
            .then((data) => {
                const result = data.data.filter((item, index) => {
                    return index <= 4
                })
                setData(result)
            })
            .catch(() => {
                console.log("loi ben server")
            })

    }, [value])
    const router = useRouter()
    return (
        <TippyHeadless
            interactive
            content="name"
            visible={data.length > 1 && view && value !== ""}
            placement='left-start'
            render={(atrr) => (
                <div tabIndex="-1" className={cx("wrapper-tippy", "flex", "flex-col-reverse")} {...atrr}>
                    {data.length > 4 && <div onClick={async () => {
                        try {
                            await router.push(`/pages/search?search=${value}`);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1800)
                        } catch (error) {
                            console.error("Error navigating:", error);
                        }
                    }} className={cx("view-add")}>Xem thêm sản phẩm</div>}
                    <div onClick={open}>
                        {data.map((item, index) => {
                            return (<div key={index} onClick={() => {
                                router.push(`http://localhost:5000/Layout/newproducts/${item.name}`)
                            }} className={cx("item", "flex")}>
                                <div className={cx("item-thumbs")}>
                                    <img
                                        alt='anh san pham'
                                        src={item.imgDefault}
                                    />
                                </div>
                                <div className={cx("title")}>
                                    <p className={cx("name")}>{item.name}</p>
                                    {item.priceSale ? (<p className={cx("price")}>{item.priceSale.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')}₫
                                        <del className={cx("ml-2")}>{item.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')}₫</del>
                                    </p>) : <p style={{ color: "black" }} className={cx("price")}>{item.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')}₫</p>}
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
            )} onClickOutside={close} >
            <div onClick={open} className={cx("search")}>
                <input value={value} onChange={handleChange} type='text' className={cx("input-search")} placeholder='Tìm kiếm' />
                <button className={cx("icon-search", "relative", "text-xs")}>
                    <BsSearch />
                </button>
            </div>
        </TippyHeadless >
    );
}

export default Search;
