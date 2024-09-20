"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Socks() {
    const [type, setType] = useState("Vớ")
    const [url, setUrl] = useState("socks")
    return (
        <LayoutPageType title="Vớ" value={url} type={type} />
    );
}

export default Socks;