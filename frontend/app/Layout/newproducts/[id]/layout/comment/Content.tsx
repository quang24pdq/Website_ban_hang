/** @format */
"use client"
import { BiSolidStar, BiStar } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import styles from "./Comment.module.scss";
import classnames from "classnames/bind";
import Cookies from "js-cookie"
import axios from "axios";
const cx = classnames.bind(styles);
function Content({ data, url }) {
    const handleDelete = async function (item) {
        window.location.reload()
        try {
            const fetchData = await axios({
                method: "post",
                url: "http://localhost:4000/api/comments/delete",
                data: {
                    id: item._id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className={cx("wrapper-content")}>
                {data.map(function (item, index) {
                    return (
                        <div key={index} className={cx("content", "pl-5", "pb-4", "flex")}>
                            <div className={cx("avatar")}>
                                <img src={item.avatar} alt='avatar' />
                            </div>
                            <div className={cx("information")}>
                                <div className={cx("flex")}>
                                    <span className={cx("name", "text-sm", "mb-1", "block")}>{item.type_name}</span>
                                    {/* update */}
                                    {(item.user_name == Cookies.get("user_name")) && <>
                                        <span onClick={() => handleDelete(item)} style={{ fontSize: "20px", cursor: "pointer" }} className={cx("ml-2")}><RiDeleteBin2Fill /></span></>}
                                    {/* update */}
                                </div>
                                <div className={cx("info-star", "flex", "mb-1")}>
                                    {
                                        [1, 2, 3, 4, 5].map(function (starNumber, starCount) {
                                            return (
                                                <div key={starCount} style={{
                                                    width: "16px",
                                                    height: "16px",
                                                }} className={cx("relative")}>
                                                    {starCount <= item.rating_star ? <BiSolidStar /> : <BiStar />}

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={cx("real-time", "text-sm", "mt-2")}>
                                    <span className={cx("y-m-d", "inline-block", "mr-2")}>{item.timeY_M_D}</span>
                                    <span className={cx("time")}>{item.timeH_M}</span>
                                </div>
                                <div style={{
                                    color: "#c1c1c1"
                                }} className={cx("uses", "mt-2", "text-sm")}>Công dụng:{item.uses}</div>
                                <div className={cx("comment", "mt-2")}>
                                    {item.message}
                                </div>
                                <div className={cx("video-images", "mt-2")}>
                                    {/* <video style={{
                                        width: '320px',
                                        height: "170px"
                                    }} controls src={item.video}></video> */}
                                    <div className={cx("flex", "items-center", "mt-4")}>
                                        {item.image.map((itemImg, indexImg) => {
                                            return (
                                                <img src={(require(`../../../../../../uploads/${itemImg}`)).default.src} className={cx("image-comment")} key={indexImg} />
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div >
    );
}
export default Content;
