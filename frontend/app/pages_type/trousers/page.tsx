"use client"
import { useState } from "react";
import LayoutPageType from "../layout";
function Trousers() {
    const [type, setType] = useState("Quần")
    const [url, setUrl] = useState("trousers")
    return (
        <LayoutPageType title="Quần" value={url} type={type} />
    );
}

export default Trousers;