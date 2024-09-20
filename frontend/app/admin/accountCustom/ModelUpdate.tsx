import React, { useState } from 'react';
import classnames from "classnames/bind"
import styles from "./Model.module.scss"
import axios from 'axios';
const cx = classnames.bind(styles)
function ModelUpdate({ data, hiddenUpdate, modelHiddenUpdate }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const handleUpdate = async () => {
        if (email != "" && password != "" && name != "") {
            axios({
                method: "post",
                url: "http://localhost:4000/accounts/update",
                data: {
                    id: data._id,
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: password,
                    full_name: fullName
                },
            }).then((data) => {
                if (data.data.success === false) {
                    alert(data.data.message);
                } else {
                    alert(data.data.message);
                    window.location.reload()
                }
            });
        }
        else {
            alert("chua dien du thong tin")
        }
    }

    return (
        <div className={cx("wrapper", {
            "flex": modelHiddenUpdate
        })}>
            <h2>Sửa tài khoản</h2>
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
                <button onClick={handleUpdate}>Sửa</button>
                <button style={{
                    marginLeft: "12px"
                }} onClick={hiddenUpdate} >Hủy</button>
            </div>
        </div>
    );
}
export default ModelUpdate;
