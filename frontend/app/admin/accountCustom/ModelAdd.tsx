import React, { useState } from 'react';
import classnames from "classnames/bind"
import styles from "./Model.module.scss"
import axios from 'axios';
const cx = classnames.bind(styles)
function ModelAdd({ hidden, modelHidden }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState("")
    const handleRegister = async () => {
        if (email != "" && password != "" && name != "") {
            axios({
                method: "post",
                url: "http://localhost:4000/register",
                data: {
                    name: name,
                    email: email,
                    full_name: fullName,
                    password: password,
                    confirmPassword: password
                },
            }).then((data) => {
                if (data.data.success === false) {
                    alert(data.data.message);
                } else {
                    alert(data.data.message);
                }
            });
            window.location.reload()
        }
        else {
            alert("chua dien du thong tin")
        }
    }

    return (
        <div className={cx("wrapper", {
            "flex": hidden
        })}>
            <h2>Đăng ký tài khoản</h2>
            <label>Tên đăng nhập:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label>Tên:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Mật khẩu:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div style={{
                display: "flex"
            }}>
                <button onClick={handleRegister}>Đăng ký</button>
                <button style={{
                    marginLeft: "12px"
                }} onClick={modelHidden} >Hủy</button>
            </div>
        </div>
    );
}
export default ModelAdd
