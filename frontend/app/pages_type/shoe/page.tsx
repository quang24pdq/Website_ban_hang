"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Shoe() {
    const [type, setType] = useState("Giày")
    const [url, setUrl] = useState("shoe")
    return (
        <LayoutPageType title="Tất cả Giày" value={url} type={type} />
    );
}

export default Shoe;