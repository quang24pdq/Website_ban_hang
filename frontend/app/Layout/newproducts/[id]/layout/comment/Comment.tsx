"use client"
import classnames from "classnames/bind"
import styles from "./Comment.module.scss"
import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";
import Content from "./Content";
import ModelComment from "./ModelComment";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
const cx = classnames.bind(styles)
function Comment({ data, url }) {
    const [check, setCheck] = useState(false)
    const [comment, setComment] = useState(null)
    const [loading, setLoading] = useState(true)
    const [star, setStar] = useState(0)
    const [refresh, setRefresh] = useReducer(x => x + 1, 0)
    const [length, setLength] = useState(0)
    const token = Cookies.get("token")
    const handleAddComment = async function () {
        try {
            if (token) {
                setCheck(true)
            }
            else {
                alert("You need to be logged in to comment")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsive = await axios({
                    method: "post",
                    url: `http://localhost:4000/api/comments/${url}`
                })
                setLength(responsive.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsive = await axios({
                    method: "get",
                    url: `http://localhost:4000/api/comments/${url}?star=${star}`
                })
                setComment(responsive.data.data.reverse())
                setRefresh()
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [refresh])
    useEffect(() => {
        if (check === true) {
            document.body.style.overflowY = 'hidden';
        }
        else {
            document.body.style.overflowY = 'auto';
        }
    }, [check])
    if (loading) {
        return <p>Loading....</p>
    }
    return (
        <div className={cx("wrapper")}>
            <ModelComment load={setRefresh} data={data} back={() => {
                setCheck(false)
            }} hidden={check} />
            <h2 className={cx("text-lg", "uppercase")}>Đánh giá sản phẩm</h2>
            <button onClick={handleAddComment} className={cx("add-comment")}>Thêm Đánh Giá</button>
            <div className={cx("product-rating-overview", "mb-4", "mt-4", "p-7", "flex", "items-center")}>
                <div className={cx("average", "mr-8", "mb-4")}>
                    <span className={cx("text-3xl")}>4.5</span> <span className={cx("text-lg")}>trên 5</span>
                    <br />
                    <div className={cx("average-star", "flex", "mt-1.5")}>
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStarHalf />
                    </div>
                </div>

                <div className={cx("product-rating-overview-filters", "flex", "ml-4")}>
                    <div onClick={() => {
                        setStar(0)
                    }} tabIndex="2" className={cx("filters-5star")}>Tất Cả({length.star0})</div>
                    <div onClick={() => {
                        setStar(5)
                    }} tabIndex="2" className={cx("filters-5star")}>5 Sao({length.star5})</div>
                    <div onClick={() => {
                        setStar(4)
                    }} tabIndex="2" className={cx("filters-4star")}>4 Sao({length.star4})</div>
                    <div onClick={() => {
                        setStar(3)
                    }} tabIndex="2" className={cx("filters-3star")}>3 Sao({length.star3})</div>
                    <div onClick={() => {
                        setStar(2)
                    }} tabIndex="2" className={cx("filters-2star")}>2 Sao({length.star2})</div>
                    <div onClick={() => {
                        setStar(1)
                    }} tabIndex="2" className={cx("filters-1star")}>1 Sao({length.star1})</div>
                    <div onClick={() => {
                        setStar(6)
                    }} tabIndex="2" className={cx("filters-img-video")}>Có Hình Ảnh/Video({length.star6})</div>
                </div>
            </div>
            <Content url={data} data={comment} />
        </div >
    );
}

export default Comment;