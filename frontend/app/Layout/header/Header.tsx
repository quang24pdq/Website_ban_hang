"use client";
import classnames from "classnames/bind";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { BsPerson, BsCart3 } from "react-icons/bs";
import Navigation from "./navigation/Navigation";
import Search from "./actions/Search";
import Cart from "../cart/Cart";
import { useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import axios from "axios";
const cx = classnames.bind(styles);
function Header() {
  const router = useRouter()
  const [userName, setUserName] = useState(Cookies.get("name"))
  const [visibleCart, setVisibleCart] = useState(false)
  const [avatar, setAvatar] = useState("")
  const [quantityCart, setQuantityCart] = useState(0)
  const handleDelete = function () {
    setVisibleCart(false)
  }
  const handleLogOut = () => {

    axios({
      method: "post",
      url: "http://localhost:4000/accounts/offline",
      data: {
        token: Cookies.get("token")
      }
    })
      .then(() => {
        Cookies.remove("user_name");
        Cookies.remove("avatar")
        Cookies.remove("name")
        sessionStorage.removeItem("cart")
        Cookies.remove("token")
        router.push("/function/login")
      })

  }
  useEffect(() => {
    if (Cookies.get("token")) {
      axios({
        method: "post",
        url: "http://localhost:4000/accounts/avatar",
        data: {
          token: Cookies.get("token")
        }
      })
        .then((data) => {
          setAvatar(data.data)
          setQuantityCart(JSON.parse(sessionStorage.getItem("cart")).length)
        })
    }
    else {
      return;
    }
  })
  useEffect(() => {
    if (visibleCart == true && Cookies.get("token")) {
      const bodyStyles = {
        position: "relative",
        right: "480px",
        transition: "right 0.4s linear"
      };
      Object.assign(document.body.style, bodyStyles);
    }
    else {
      const bodyStyles = {
        position: "relative",
        backgroundColor: "white",
        right: "0"
      };
      Object.assign(document.body.style, bodyStyles);
    }
  }, [visibleCart])
  return (
    <div className={cx("header", "w-full")}>
      <div onClick={() => {
        setVisibleCart(false)
      }} style={(visibleCart && Cookies.get("token")) ? {
        visibility: "visible",
        opacity: "1"
      } : { visibility: "hidden", opacity: "0" }} className={cx("model")}></div>
      <div className={cx("wrappper", "px-10", "flex", "items-center", "justify-between", "h-full")}>
        <Link href={"/"} className={cx("logo")}>
          <Image
            className={cx("pr-1.5", "pb-1.5", "block", "ml-8")}
            src="https://file.hstatic.net/1000003969/file/logo-svg.svg"
            width={90}
            height={30}
            alt="Picture of the author"
          />
        </Link>
        <Navigation />
        <div className={cx("actions", "flex")}>
          <Search />
          <div className={cx("action", "px-5", "flex", "items-center")}>
            {userName ? <div className={cx("user")}>
              <div className={cx("avatar")}> <img src={avatar ? avatar : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg"} alt="avatar" /></div>
              <span className={cx("user_name")}>{userName}</span>
              <ul className={cx("list")}>
                <li onClick={() => {
                  router.push("/pages/profile")
                }} className={cx('item')}>Tài Khoản Của Tôi</li>
                <li onClick={() => {
                  router.push("/pages/order_custom")
                }} className={cx('item')}>Đơn Mua</li>
                <li onClick={handleLogOut} className={cx('item')}>Đăng Xuất</li>
              </ul>
            </div> : <Link href={"/function/login"} className={cx("use")}>
              <BsPerson />
            </Link>}
            <div onClick={() => {
              setVisibleCart(true)
            }} className={cx("cart")}>
              <BsCart3 />
              <div className={cx("cart-quantity")}>{userName ? quantityCart : 0}</div>
            </div>
          </div>
        </div>
        {Cookies.get("token") && (<Cart visible={visibleCart} onClick={handleDelete} />)}
      </div>
    </div >
  );
}
export default Header;
