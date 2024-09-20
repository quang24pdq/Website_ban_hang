/** @format */
"use client"
import React, { useEffect, useState } from "react"
import Header from "../../header/Header";
import PageProduct from "./layout/PageProduct";
import Policy from "./layout/Policy";
import Like from "./layout/Like";
import axios from "axios";
import Comment from "./layout/comment/Comment";
import Footer from "../../footer";
function Detail({ params }: { params: { id: string } }) {
    const id = decodeURIComponent(params.id)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/detail/${id}`);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Chạy chỉ một lần khi component được mount

    if (loading) {
        return <p>Loading...</p>; // Hoặc hiển thị một spinner hoặc thông báo chờ
    }

    if (error) {
        return <p>Error: {error}</p>; // Hoặc hiển thị một thông báo lỗi
    }
    return (
        <div >
            <Header />
            <PageProduct data={data} />
            <Policy />
            <Comment url={id} data={data} />
            <Like data={data} />
            <Footer />
        </div>
    );
}
export default Detail;
