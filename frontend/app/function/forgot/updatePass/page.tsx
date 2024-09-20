"use client"

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
function UpdatePass() {
    const router = useRouter()
    const [password, setPassWord] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = async function () {
        try {
            if (password != confirmPassword) {
                alert("mat khau nhap chua chinh xac")
            }
            else {
                const requestApi = await axios({
                    method: "post",
                    url: "http://localhost:4000/forgot/updatePassword",
                    data: {
                        password: password,
                        confirmPassword: confirmPassword,
                        email: Cookies.get("email")
                    }
                })
                const result = requestApi.data
                alert(result.message)
                setTimeout(() => {
                    router.push("/function/login")
                    Cookies.remove("email")
                }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div style={{
                maxWidth: "200px",
                display: "flex",
                flexDirection: "column"
            }}>
                <input onChange={(e) => {
                    setPassWord(e.target.value)
                }} style={{ marginBottom: "12px", padding: "6px 8px" }} value={password} type="text" placeholder="password" />
                <input onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }} style={{ marginBottom: "12px", padding: "6px 8px" }} value={confirmPassword} type="password" placeholder="confirmpassword" />
            </div>
            <button onClick={handleSubmit} type="submit">Submit</button>
        </div>
    );
}
export default UpdatePass;