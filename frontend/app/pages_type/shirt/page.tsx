"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Shirt() {
    const [type, setType] = useState("Áo")
    const [url, setUrl] = useState("shirt")
    return (
        <LayoutPageType title="Áo" value={url} type={type} />
    );
}

export default Shirt;