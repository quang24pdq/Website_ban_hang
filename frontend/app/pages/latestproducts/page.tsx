"use client"
import classnames from "classnames/bind"
import "../../../app/globals.css"
import styles from "./LatestProducts.module.scss"
import Header from "@/app/Layout/header/Header";
import LatestProduct from ".";
import Footer from "@/app/Layout/footer";
import Back from "@/app/Layout/back/Back";
import { useState } from "react";
const cx = classnames.bind(styles)
function LatestProductsAll() {
    const [hidden, setHidden] = useState(false)
    return (
        <div>
            <Header />
            <LatestProduct onHidden={() => {
                setHidden(true)
            }} />
            <Back />
            {hidden && <Footer />}
        </div>
    );
}

export default LatestProductsAll;