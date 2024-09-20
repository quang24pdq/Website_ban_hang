"use client"
import Header from "@/app/Layout/header/Header";
import "../../globals.css"
import styles from "./Profile.module.scss"
import classnames from "classnames/bind"
import UpdateProfile from ".";
import Footer from "@/app/Layout/footer";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
const cx = classnames.bind(styles)
function Profile() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")
    const [modelPassword, setModelPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [passwordEmail, setPasswordEmail] = useState("")
    const [modelEmail, setModelEmail] = useState(false)
    const handleClosePassword = function () {
        setModelPassword(false)
    }
    const handleCloseEmail = function () {
        setModelEmail(false)
    }
    const handleUpdatePassword = function () {
        if (newPassword && oldPassword && newPasswordConfirm && newPassword == newPasswordConfirm) {
            try {
                axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_password",
                    data: {
                        token: Cookies.get("token"),
                        password: oldPassword,
                        newPassword: newPassword
                    }
                })
                    .then((data) => {
                        if (data.data.success) {
                            alert(data.data.message)
                            window.location.reload()
                        }
                        else {
                            alert(data.data.message)

                        }
                    })
                    .catch((err) => {
                        alert(err)
                    })

            } catch (error) {
                console.log(error)
            }
        }
        else if (!newPassword || !oldPassword || !newPasswordConfirm) {
            alert("Bạn chưa nhập đủ thông tin")
        }
        else if (newPassword && oldPassword && newPasswordConfirm) {
            if (newPassword != newPasswordConfirm) {
                alert("Mật khẩu mới không trùng khớp")
            }
        }
    }
    const handleUpdateEmail = function () {
        if (newEmail && email && passwordEmail) {
            try {
                axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_email",
                    data: {
                        token: Cookies.get("token"),
                        password: passwordEmail,
                        newEmail: newEmail,
                        email: email
                    }
                })
                    .then((data) => {
                        if (data.data.success) {
                            alert(data.data.message)
                            window.location.reload()
                        }
                        else {
                            alert(data.data.message)

                        }
                    })
                    .catch((err) => {
                        alert(err)
                    })

            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert("Bạn chưa nhập đủ thông tin")
        }
    }
    return (
        <div className={cx("wrapper")}>
            <div style={modelPassword ? { visibility: "visible" } : { visibility: "hidden" }} className={cx("model_password")}>
                <div className={cx("model_form")}>
                    <h3 className={cx("text-center")}>Thay đổi mật khẩu</h3>
                    <div className={cx("field")}>
                        <label htmlFor="old-password">Mật khẩu cũ:</label>
                        <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} name="old-password" type="password" placeholder="Mật khẩu cũ" />
                    </div>
                    <div className={cx("field")}>
                        <label htmlFor="new-password">Mật khẩu mới:</label>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="new-password" type="password" placeholder="Mật khẩu mới" />
                    </div>
                    <div className={cx("field")}>
                        <label htmlFor="confirm-password">Xác nhận mật khẩu mới:</label>
                        <input value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} type="password" placeholder="Xác nhận mật khẩu mới" />
                    </div>
                    <div className={cx("btn-password", 'flex')}>
                        <button onClick={handleUpdatePassword} className={cx("save")}>Lưu</button>
                        <button onClick={handleClosePassword} className={cx("close")}>Đóng</button>
                    </div>
                </div>
            </div>
            <div style={modelEmail ? { visibility: "visible" } : { visibility: "hidden" }} className={cx("model_password")}>
                <div className={cx("model_form")}>
                    <h3 className={cx("text-center")}>Thay đổi Email</h3>
                    <div className={cx("field")}>
                        <label htmlFor="old-email">Email hiện tại:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} name="old-password" type="email" placeholder="Email hiện tại..." />
                    </div>
                    <div className={cx("field")}>
                        <label htmlFor="new-email">Email mới:</label>
                        <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} name="new-password" type="email" placeholder="Email mới..." />
                    </div>
                    <div className={cx("field")}>
                        <label htmlFor="password">Mật khẩu:</label>
                        <input value={passwordEmail} onChange={(e) => setPasswordEmail(e.target.value)} name="password" type="password" placeholder="Mật khẩu... " />
                    </div>
                    <div className={cx("btn-password", 'flex')}>
                        <button onClick={handleUpdateEmail} className={cx("save")}>Lưu</button>
                        <button onClick={handleCloseEmail} className={cx("close")}>Đóng</button>
                    </div>
                </div>
            </div>
            <Header />
            <UpdateProfile modelEmail={setModelEmail} modelPassword={setModelPassword} />
            <Footer />
        </div>
    )
}
export default Profile;