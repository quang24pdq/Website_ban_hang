"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Glasses() {
    const [type, setType] = useState("Kính")
    const [url, setUrl] = useState("glasses")
    return (
        <LayoutPageType title="Mắt kính" value={url} type={type} />
    );
}

export default Glasses;