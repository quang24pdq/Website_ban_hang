"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Dress() {
    const [type, setType] = useState("Váy")
    const [url, setUrl] = useState("dress")
    return (
        <LayoutPageType title="Váy" value={url} type={type} />
    );
}

export default Dress;
