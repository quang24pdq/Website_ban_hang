"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Sandal() {
    const [type, setType] = useState("Dép")
    const [url, setUrl] = useState("sandal")
    return (
        <LayoutPageType title="Dép Guốc" value={url} type={type} />
    );
}

export default Sandal;