"use client";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import "../../globals.css";
import Cookies from "js-cookie";
const cx = classNames.bind(styles);
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
function Login() {
  const router = useRouter();
  const [type, setType] = useState("password");
  const [check, setCheck] = useState(false);
  const [valEmail, setValEmail] = useState("");
  const [valPassword, setValPassword] = useState("");
  const data = {
    email: valEmail,
    password: valPassword,
  };
  const handlerLogin = function () {
    axios
      .post("http://localhost:4000/login", data)
      .then((data) => {
        if (data.data.success == true) {
          Cookies.set("token", data.data.data);
          Cookies.set("user_name", data.data.user_name)
          Cookies.set("name", data.data.full_name)
          alert(data.data.message);
          router.push("/");
        } else {
          alert(data.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlerForgot = function () { };
  return (
    <div className={cx("wrapper", "flex", "h-screen", "flex-col")}>
      <form className={cx("form")}>
        <h1 className={cx("title")}>Login </h1>
        <div className={cx("btn", "mb-34")}>
          <Link href={"/function/login"} className={cx("btn-Login")}>
            Login
          </Link>
          <Link href={"/function/register"} className={cx("btn-Signup")}>
            Signup
          </Link>
        </div>
        <input
          onChange={(e) => {
            setValEmail(e.target.value);
          }}
          value={valEmail}
          name="email"
          type="email"
          className={cx("email", "mb-26")}
          placeholder="Email Address or Phone Number..."
          required
        />
        <div className={cx("d-flex", "wrapper-password")}>
          <input
            onChange={(e) => {
              setValPassword(e.target.value);
            }}
            value={valPassword}
            name="password"
            autoComplete="password"
            type={type}
            className={cx("password", "w-full")}
            placeholder="Password"
            required
          />

          <div className={cx("hidden-password")}>
            <span
              className={cx("eye", {
                none: check,
              })}
              onClick={() => {
                setCheck(!check);
                setType("text");
              }}>
              <BsEyeSlash />
            </span>
            <span
              className={cx("eye-close", {
                none: !check,
              })}
              onClick={() => {
                setType("password");
                setCheck(!check);
              }}>
              <BsEye />
            </span>
          </div>
        </div>

        <div onClick={handlerLogin} className={cx("btn-submit", "flex", "justify-center", "items-center")}>
          Login
        </div>
        <div className={cx("footer")}>
          If you already have an account?
          <Link href={"/function/register"}>Sigup</Link>
        </div>
        <div
          onClick={handlerForgot}
          style={{
            fontWeight: "bold",
            color: "#70bdf3",
          }}
          className={cx("footer-footer", "flex", "justify-center", "items-center", "mt-4", "text-sm")}>
          <Link href={"/function/forgot"}>Forgot password</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
