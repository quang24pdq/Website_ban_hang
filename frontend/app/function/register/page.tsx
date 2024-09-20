"use client";
import styles from "./Register.module.scss";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import "../../globals.css";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);
function Register() {
  const router = useRouter();
  const [typePassword, setTypePassword] = useState("password");
  const [typeComfirmPassword, setTypeComfirmPassword] = useState("password");
  const [check, setCheck] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  //form
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const { values, handleChange, errors, handleSubmit, handleBlur, touched } = useFormik({
    initialValues: {
      name: "",
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(8, "Must be 8 characters or less")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Password is required")
        .matches(regex, "Minimum eight characters, at least one letter and one number"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      full_name: Yup.string()
        .min(8, "Must be 8 characters or less")
        .max(32, "Must be 15 characters or less")
        .required("Required"),
    }),

    onSubmit: (values) => { },
  });
  const { name, email, password, confirmPassword, full_name } = errors;
  const handleRegister = () => {
    if (
      name === undefined &&
      full_name === undefined &&
      email === undefined &&
      password === undefined &&
      confirmPassword === undefined &&
      touched.name &&
      touched.full_name &&
      touched.email &&
      touched.password &&
      touched.confirmPassword
    ) {
      axios({
        method: "post",
        url: "http://localhost:4000/register",
        data: values,
      }).then((data) => {
        if (data.data.success === false) {
          alert(data.data.message);
        } else {
          alert(data.data.message);
          router.push("/function/login");
        }
      });
    } else {
      alert("Invalid information please re-enter");
    }
  };
  return (
    <div>
      <div className={cx("wrapper", "flex")}>
        <form onSubmit={handleSubmit} className={cx("form")}>
          <h1 className={cx("title")}>Create Account </h1>
          <div className={cx("btn", "mb-34")}>
            <button className={cx("btn-Login", "btn-active")}>Signup</button>

            <Link href="/function/login" className={cx("btn-Signup")}>
              Login
            </Link>
          </div>
          <input
            type="text"
            className={cx("name", "mb-26")}
            placeholder="Tên đăng nhập"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            required
            name="name"
          />
          {touched.name && errors.name ? <div className={cx("errors", "block")}>{errors.name}</div> : null}
          <input
            type="text"
            className={cx("name", "mb-26")}
            placeholder="Tên"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.full_name}
            required
            name="full_name"
          />
          {touched.full_name && errors.full_name ? <div className={cx("errors", "block")}>{errors.full_name}</div> : null}
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            className={cx("email", "mb-26")}
            placeholder="Email Address ..."
            required
            name="email"
          />
          {touched.email && errors.email ? <div className={cx("errors", "block")}>{errors.email}</div> : null}
          <div className={cx("flex", "wrapper-password")}>
            <input
              type={typePassword}
              className={cx("password", "mb-26")}
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="foo"
            />

            <div className={cx("hidden-password")}>
              <span
                className={cx("eye", {
                  none: check,
                })}
                onClick={() => {
                  setCheck(!check);
                  setTypePassword("text");
                }}>
                <BsEyeSlash />
              </span>
              <span
                className={cx("eye-close", {
                  none: !check,
                })}
                onClick={() => {
                  setCheck(!check);
                  setTypePassword("password");
                }}>
                <BsEye />
              </span>
            </div>
          </div>
          {touched.password && errors.password ? <div className={cx("errors", "block")}>{errors.password}</div> : null}
          <div className={cx("flex", "wrapper-password")}>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              type={typeComfirmPassword}
              className={cx("confirm-password", "mb-26")}
              placeholder="Confirm password"
              autoComplete="foo"
              required
              name="confirmPassword"
            />
            <div className={cx("hidden-password")}>
              <span
                className={cx("eye", {
                  none: checkPassword,
                })}
                onClick={() => {
                  setCheckPassword(!checkPassword);
                  setTypeComfirmPassword("text");
                }}>
                <BsEyeSlash />
              </span>
              <span
                className={cx("eye-close", {
                  none: !checkPassword,
                })}
                onClick={() => {
                  setCheckPassword(!checkPassword);
                  setTypeComfirmPassword("password");
                }}>
                <BsEye />
              </span>
            </div>
          </div>
          {touched.confirmPassword && errors.confirmPassword ? (
            <div className={cx("errors", "block")}>{errors.confirmPassword}</div>
          ) : null}

          <div
            onClick={handleRegister}
            style={{
              color: "white",
              marginTop: "0px",
            }}
            className={cx("btn-submit", "flex", "justify-center", "items-center")}>
            Signup
          </div>

          <div className={cx("footer")}>
            Already have an account? <Link href="/function/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
