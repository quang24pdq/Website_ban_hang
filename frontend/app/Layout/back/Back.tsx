"use client"
import { AiOutlineArrowRight } from "react-icons/ai";
import classnames from "classnames/bind"
import style from "./Back.module.scss"
import { useState, useEffect } from "react";
const cx = classnames.bind(style)
function Back() {
    const [scrollTop, setScrollTop] = useState(0);
    const handleOnclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    useEffect(() => {
        const handleScroll = event => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div onClick={handleOnclick} className={cx("wrapper")} style={(scrollTop > 0) ? { visibility: "visible" } : { visibility: "hidden", opacity: "0" }}>
            <div className={cx("btn")}><AiOutlineArrowRight /></div>
            <span>Về đầu trang</span>
        </div>
    );
}

export default Back;