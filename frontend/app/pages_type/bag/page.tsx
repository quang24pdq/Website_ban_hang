"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Bag() {
    const [type, setType] = useState("Túi")
    const [url, setUrl] = useState("bag")
    return (
        <LayoutPageType title="Tất cả Túi Xách" value={url} type={type} />
    );
}

export default Bag;