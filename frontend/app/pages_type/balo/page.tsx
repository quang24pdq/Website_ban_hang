"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Balo() {
    const [type, setType] = useState("Balo")
    const [url, setUrl] = useState("balo")
    return (
        <LayoutPageType title="Ba lô thời trang" value={url} type={type} />
    );
}

export default Balo;