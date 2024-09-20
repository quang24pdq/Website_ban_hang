"use client"
import axios from "axios"
import styles from "./Profile.module.scss"
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import Cookies from "js-cookie"
import { useState } from "react"
function UpdateProfile({ modelPassword, modelEmail }) {
    const [name, setName] = useState(Cookies.get("user_name"))
    const [fullName, setFullName] = useState("")
    const [base64Image, setBase64Image] = useState(Cookies.get("avatar"));
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpdatePassword = function () {
        modelPassword(true)
    }
    const handleUpdate = function () {
        if (name === "" && fullName === "") {
            if (base64Image) {
                const request = axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_info",
                    data: {
                        token: Cookies.get("token"),
                        name: name,
                        full_name: fullName,
                        avatar: `data:image/png;base64,${base64Image}`
                    }
                })
                const result = request
                window.location.reload()
                alert("Cập nhật thành công")
            }
            else {
                alert("Bạn chưa nhập đủ thông tin")
            }
        }
        else if (fullName === "" && name == Cookies.get("user_name")) {
            if (base64Image) {
                const request = axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_info",
                    data: {
                        token: Cookies.get("token"),
                        name: name,
                        full_name: fullName,
                        avatar: `data:image/png;base64,${base64Image}`
                    }
                })
                const result = request
                window.location.reload()
                alert("Cập nhật thành công")
            }
            else {
                alert("Tên đăng nhập đã được sử dụng trước đó")
            }
        }
        else if (fullName != "" && !name == Cookies.get("user_name")) {
            const request = axios({
                method: "post",
                url: "http://localhost:4000/accounts/update_info",
                data: {
                    token: Cookies.get("token"),
                    name: name,
                    full_name: fullName,
                    avatar: `data:image/png;base64,${base64Image}`
                }
            })
            const result = request
            alert("Cập nhật thành công")
            Cookies.set("user_name", name)
            Cookies.set("name", fullName)
            window.location.reload()
        }
        else if (fullName != "" && name == Cookies.get("user_name")) {
            if (base64Image) {
                const request = axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_info",
                    data: {
                        token: Cookies.get("token"),
                        name: name,
                        full_name: fullName,
                        avatar: `data:image/png;base64,${base64Image}`
                    }
                })
                const result = request
                alert("Cập nhật thành công")
                Cookies.set("name", fullName)
                window.location.reload()
            }
            else {
                const request = axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_info",
                    data: {
                        token: Cookies.get("token"),
                        name: name,
                        full_name: fullName,
                    }
                })
                const result = request
                alert("Cập nhật thành công")
                Cookies.set("name", fullName)
                window.location.reload()
            }
        }
        else if (fullName == "" && name != Cookies.get("user_name")) {
            if (base64Image) {
                const request = axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_info",
                    data: {
                        token: Cookies.get("token"),
                        name: name,
                        full_name: fullName,
                        avatar: `data:image/png;base64,${base64Image}`
                    }
                })
                const result = request
                alert("Cập nhật thành công")
                Cookies.set("user_name", name)
                window.location.reload()
            }
            else {
                const request = axios({
                    method: "post",
                    url: "http://localhost:4000/accounts/update_info",
                    data: {
                        token: Cookies.get("token"),
                        name: name,
                        full_name: fullName,
                    }
                })
                const result = request
                alert("Cập nhật thành công")
                window.location.reload()
                Cookies.set("user_name", name)
            }
        }
        else if (fullName && name != Cookies.get("user_name") && base64Image) {
            const request = axios({
                method: "post",
                url: "http://localhost:4000/accounts/update_info",
                data: {
                    token: Cookies.get("token"),
                    name: name,
                    full_name: fullName,
                    avatar: `data:image/png;base64,${base64Image}`
                }
            })
            const result = request
            alert("Cập nhật thành công")
            Cookies.set("user_name", name)
            Cookies.set("name", fullName)
            window.location.reload()
        }
    }
    return (
        <section style={{
            paddingTop: "50px",
            height: "60vh",
            background: "#f5f5f5"
        }}>
            <div className={cx("xMDeox")}>
                <div role="main">
                    <div style={{ display: "contents" }}>
                        <div className={cx("b7wtmP")}>
                            <div>
                                <h1 style={{ fontSize: "20px", fontWeight: "400" }} >Hồ Sơ Của Tôi</h1>
                                <div className={cx("zptdmA")}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                            </div>
                            <div className={cx("R-Gpdg")}>
                                <div className={cx("volt8A")}>
                                    <form>
                                        <table className={cx("Zj7UK")}>
                                            <tr>
                                                <td className={cx("espR83", "qQTY0O")}><label>Tên đăng nhập</label></td>
                                                <td className={cx("Tmj5Z6")}>
                                                    <div>
                                                        <div className={cx("W50dp5")}>
                                                            <input
                                                                onChange={(e) => {
                                                                    setName(e.target.value)
                                                                }}
                                                                type="text"
                                                                placeholder=""
                                                                className={cx("CMyrTJ")}
                                                                value={name} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={cx("espR83")}><label>Tên</label></td>
                                                <td className={cx("Tmj5Z6")}>
                                                    <div>
                                                        <div className={cx("W50dp5")}>
                                                            <input onChange={(e) => {
                                                                setFullName(e.target.value)
                                                            }} type="text" placeholder="" className={cx("CMyrTJ")} value={fullName} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={cx("espR83")}><label>Email</label></td>
                                                <td className={cx("Tmj5Z6")}>
                                                    <div className={cx("_0ZgK9X")}>
                                                        <div className={cx("uxYEXm")}>*********@gmail.com</div>
                                                        <div style={{ cursor: "pointer" }} onClick={() => { modelEmail(true) }} className={cx("DJRxAF")}>Thay đổi</div>
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className={cx("espR83")}><label>Mật khẩu</label></td>
                                                <td className={cx("Tmj5Z6")}>
                                                    <div className={cx("_0ZgK9X")}>
                                                        <div className={cx("uxYEXm")}>*********</div>
                                                        <div onClick={handleUpdatePassword} style={{ cursor: "pointer" }} className={cx("DJRxAF")}>Thay đổi</div>
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className={cx("espR83")}><label></label></td>
                                                <td className={cx("Tmj5Z6")}>
                                                    <div
                                                        onClick={handleUpdate}
                                                        className={cx("btn", "btn-solid-primary", "btn--m", "btn--inline")}
                                                        aria-disabled="false">
                                                        Lưu
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </form>
                                </div>
                                <div className={cx("IQPHvE")}>
                                    <div className={cx("scvgOW")}>
                                        <div className={cx("XWsmVn")}>
                                            <img alt="" src={base64Image ? `data:image/png;base64,${base64Image}` : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg"} className={cx("_9tTgB7")} />
                                        </div>
                                        <input id="avatar" onChange={handleUpload} className={cx("bMWDYw")} type="file" accept=".jpg,.jpeg,.png" />
                                        <label
                                            htmlFor="avatar"
                                            id="avatar"
                                            className={cx("btn", "btn-light", "btn--m", "btn--inline")}>
                                            Chọn ảnh
                                        </label>
                                        <div className={cx("L4SAGB")}>
                                            <div className={cx("SlaeTm")}>Dụng lượng file tối đa 1 MB</div>
                                            <div className={cx("SlaeTm")}>Định dạng:.JPEG, .PNG</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    );
}

export default UpdateProfile;