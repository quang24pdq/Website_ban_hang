"use client"
import Footer from "@/app/Layout/footer";
import Header from "@/app/Layout/header/Header";
import "../../globals.css"
import Content from "./Content";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import axios from "axios";
function Search() {
    const [data, setData] = useState(null)
    const [value, setValue] = useState(Cookies.get("value-search"))
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        const fetchData = async function () {
            try {
                const responsive = await axios({
                    method: "get",
                    url: `http://localhost:4000/api/search?search=${value}`,
                })
                setData(responsive.data)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [value])
    if (!loader) {
        return <p>...Loader</p>
    }
    return (
        <>
            <Header />
            <Content data={data} />
            <Footer />
        </>
    );
}

export default Search;