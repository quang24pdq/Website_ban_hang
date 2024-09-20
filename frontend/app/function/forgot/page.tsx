"use client";
import styles from "./Forgot.module.scss";
import "../../globals.css";
import classnames from "classnames/bind";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
const cx = classnames.bind(styles);
function Forgot() {
  const [valEmail, setValEmail] = useState();
  const route = useRouter();
  const handlerClick = function () {
    axios({
      method: "post",
      url: "http://localhost:4000/forgot",
      data: {
        email: valEmail,
      },
    }).then((data) => {
      if (data.data.success) {
        alert("Da gui thong bao ve email cua ban")
        console.log(data.data.data.email)
        Cookies.set("email", data.data.data.email)
      }
      else {
        alert(data.data.message)
      }
    })
      .catch((err) => {

      });
  };
  return (
    <div className={cx("w-full", "h-screen", "wrapper", "flex", "justify-center")}>
      <div className={cx("form")}>
        <span className={cx("title")}>Tìm tài khoản của bạn</span>
        <div className={cx("content")}>
          <span className={cx("content-title", "mx-7")}>
            Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của bạn.
          </span>
          <input
            value={valEmail}
            onChange={(e) => setValEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className={cx("mx-7")}
          />
        </div>
        <div className={cx("button")}>
          <button onClick={handlerClick} className={cx("btn-search", "btn")}>
            Tìm kiếm
          </button>
          <button
            onClick={() => {
              route.push("/function/login");
            }}
            className={cx("btn-cancel", "btn")}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
