/** @format */
"use client";
import styles from "./Model.module.scss";
import classnames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Star, StarBold } from "./star";
const cx = classnames.bind(styles);
import { BsCameraFill, BsCameraVideoFill } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie"
function ModelComment({ hidden, data, back, load }) {
    const [message, setMessage] = useState("");
    const [uses, setUses] = useState("");
    const [selectStar, setSelectStar] = useState(4);
    const [selectStarUsesBuy, setSelectStarUsesBuy] = useState(5);
    const [selectStarTransport, setSelectStarTransport] = useState(5);
    const [typeName, setTypeName] = useState(true);
    const [name, setName] = useState("");
    const [full_name, setFullName] = useState("")
    const nameEncode = full_name.charAt(0) + "*********" + full_name.charAt(name.length - 1);
    const hiddenName = typeName ? full_name : nameEncode;
    const date = new Date();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const timeY_M_D = year + "-" + month + "-" + day;
    const timeH_M = +hour + ":" + minute;
    const [imagePreview, setImagePreview] = useState([])
    const [images, setImages] = useState([])
    useEffect(() => {
        if (Cookies.get("user_name")) {
            setName(Cookies.get("user_name"))
        }
        else {
            setName("")
        }
    }, [])
    useEffect(() => {
        if (Cookies.get("name")) {
            setFullName(Cookies.get("name"))
        }
        else {
            setName("")
        }
    }, [])
    const BtnDelete = function () {
        return (
            <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.28268 0.908882C8.47794 0.71362 8.79452 0.71362 8.98978 0.908882L9.0908 1.0099C9.28606 1.20516 9.28606 1.52174 9.0908 1.717L1.71669 9.09112C1.52142 9.28638 1.20484 9.28638 1.00958 9.09112L0.908564 8.9901C0.713301 8.79484 0.713301 8.47826 0.908563 8.283L8.28268 0.908882Z'
                    fill='#F6F6F6'></path>
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1.00973 0.908882C1.20499 0.71362 1.52157 0.71362 1.71683 0.908882L9.09095 8.28299C9.28621 8.47826 9.28621 8.79484 9.09095 8.9901L8.98993 9.09112C8.79467 9.28638 8.47809 9.28638 8.28283 9.09112L0.908713 1.717C0.713451 1.52174 0.71345 1.20516 0.908713 1.0099L1.00973 0.908882Z'
                    fill='#F6F6F6'></path>
            </svg>
        );
    };


    const handlerRatingTransport = function (index) {
        setSelectStarTransport(index);
    };
    const handlerRatingUsesBuy = function (index) {
        setSelectStarUsesBuy(index);
    };
    const handlerRating = function (index) {
        setSelectStar(index);
    };
    const handlerBack = function () {
        setSelectStarTransport(5);
        setSelectStarUsesBuy(5);
        setSelectStar(5);
        back();
        setImages([])
        setImagePreview([])
    };
    const handleDelete = function (index) {
        const deleArray = imagePreview.slice(index, index + 1)
        const newArray = imagePreview.filter((i, d) => {
            return i != deleArray
        })
        setImagePreview(newArray)

        const newFiles = [...images];
        newFiles.splice(index, 1);
        setImages(newFiles);
    }
    const handleUpLoadImage = function (e) {
        const event = e.target.files[0]
        setImages((prev) => {
            return [...prev, event]
        })
        const url = URL.createObjectURL(event)
        if (imagePreview.length - 1 >= 5) {
            return
        }
        else {
            setImagePreview((prev) => {
                return [...prev, url]
            })
        }
    }
    const dataEntry = {
        img: data.imgDefault,
        name_product: data.name,
        rating_star: selectStar,
        rating_star_buy: selectStarUsesBuy,
        rating_star_transport: selectStarTransport,
        uses: uses,
        message: message,
        token: Cookies.get("token"),
        type_name: hiddenName,
        timeY_M_D: timeY_M_D,
        timeH_M: timeH_M,
    }
    const handerlerSubmit = function () {
        if (message === "" || uses === "") {
            alert("Ban chua nhap du thong tin")
            return
        }
        const formDataImages = new FormData()
        for (const image of images) {
            formDataImages.append("images", image)
        }
        Object.entries(dataEntry).forEach(([key, value]) => {
            formDataImages.append(key, value);
        });
        axios({
            method: "post",
            url: "http://localhost:4000/api/comments/post",
            data: formDataImages,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // window.location.reload()
        back()
        load()
    };
    return (
        <div
            className={cx("wrapper", "hidden", "fixed", "w-full", "h-full", "top-0", "right-0", {
                blockModel: hidden,
                noneModel: !hidden,
            })}>
            <div className={cx("model")}>
                <div className={cx("form")}>
                    <h2 className={cx("title", "text-xl", "capitalize", "mb-8")}>Đánh giá sản phẩm</h2>
                    <div className={cx("product", "flex", "items-center")}>
                        <div className={cx("avatar", "mr-3")}>
                            <img onClick={() => { }} src={data.imgDefault} alt='sản phẩm' />
                        </div>
                        <div className={cx("name")}>
                            {data.name}
                        </div>
                    </div>

                    <div className={cx("product-rating", "flex", "items-center", "my-5")}>
                        <span style={{ minWidth: "180px" }} className={cx("text-xs")}>
                            Chất lượng sản phẩm
                        </span>
                        <div className={cx("rating-star", "flex", "cursor-pointer")}>
                            {[1, 2, 3, 4, 5].map((item, index) => {
                                return (
                                    <div key={index} className={cx("flex", "items-center", "pl-1.5")}>
                                        <div
                                            onClick={() => {
                                                handlerRating(index);
                                            }}
                                            className={cx("rating-stars")}>
                                            {index <= selectStar ? <StarBold /> : <Star />}
                                        </div>
                                    </div>
                                );
                            })}
                            <span className={cx("ml-2", "flex", "items-center")} style={{ fontSize: "14px" }}>
                                {selectStar == 0
                                    ? "Tệ"
                                    : selectStar == 1
                                        ? "Không hài lòng"
                                        : selectStar == 2
                                            ? "Bình thường"
                                            : selectStar == 3
                                                ? "Hài lòng"
                                                : "Tuyệt vời"}
                            </span>
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("content")}>
                            <div className={cx("uses")}>
                                Công dụng:
                                <br />
                                <textarea
                                    value={uses}
                                    onChange={(e) => {
                                        setUses(e.target.value);
                                    }}
                                    rows='1'
                                    className={cx("detail-uses", "mt-1")}></textarea>
                            </div>
                            <span className={cx("seperate")}></span>
                            <div className={cx("evalute")}>
                                <textarea
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                    style={{
                                        minHeight: "100px",
                                        width: "100%",
                                        outline: "none",
                                        border: "none",
                                        resize: "none",
                                    }}
                                    placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé.'
                                    name=''
                                    id=''
                                    rows='3'></textarea>
                            </div>
                        </div>

                        <div className={cx("upload", "flex", "mt-5")}>
                            <label style={(imagePreview.length - 1 >= 5) ? {
                                pointerEvents: "none",
                                opacity: ".4"
                            } : {}} htmlFor='file-upload' className={cx("add-image", "flex")}>
                                <form>
                                    <input
                                        accept='image/*'
                                        id='file-upload'
                                        style={{
                                            display: "none",
                                        }}
                                        type='file'
                                        onChange={handleUpLoadImage}
                                    />
                                </form>
                                <BsCameraFill />
                                <span className={cx("ml-1")}>Thêm hình ảnh</span>
                            </label>
                        </div>
                        {imagePreview.length > 0 && <div className={cx("relative", "flex", "items-center")}> {imagePreview.map((item, index) => {
                            return (
                                <div key={index} className={cx("relative", "image-preview")}>
                                    <img src={item} alt="" />
                                    <button onClick={() => { handleDelete(index) }} className={cx("btn-delete")}><BtnDelete /></button>
                                </div>
                            )
                        })}</div>}
                        {imagePreview.length - 1 >= 5 && <p style={{ color: "red" }} className={cx("text-sm", "mt-4")}>Bạn chỉ được tải lên tối đa 5 hình ảnh</p>}
                    </div>

                    <div className={cx("view-name", "mt-2", "flex", "items-center")}>
                        <div className={cx("check")}>
                            <input
                                readOnly
                                checked={typeName}
                                onClick={() => {
                                    setTypeName(!typeName);
                                }}
                                id='checkName'
                                style={{ width: "18px", height: "18px" }}
                                type='checkbox'
                            />
                        </div>
                        <label htmlFor='checkName' className={cx("info-name")}>
                            <span>Hiển thị tên đăng nhập trên đánh giá này</span>
                            <span style={{ fontSize: "12px" }}>Tên tài khoản sẽ được hiển thị như {hiddenName}</span>
                        </label>
                    </div>

                    <div className={cx("service", "mt-5")}>
                        <span className={cx("mb-3", "block")}>Về Dịch Vụ</span>

                        <div className={cx("service-rating-buy", "mb-5", "flex", "items-center")}>
                            <span
                                style={{ minWidth: "180px" }}
                                className={cx("text-sm", "flex", "items-center", "block")}>
                                Dịch vụ của người bán
                            </span>
                            <div className={cx("service-star", "rating-star", "flex", "items-center")}>
                                {[1, 2, 3, 4, 5].map((item, index) => {
                                    return (
                                        <div key={index} className={cx("flex", "items-center", "pl-1.5")}>
                                            <div
                                                onClick={() => {
                                                    handlerRatingUsesBuy(index);
                                                }}
                                                className={cx("rating-stars")}>
                                                {index <= selectStarUsesBuy ? <StarBold /> : <Star />}
                                            </div>
                                        </div>
                                    );
                                })}
                                <span className={cx("ml-2", "flex", "items-center")} style={{ fontSize: "14px" }}>
                                    {selectStarUsesBuy == 0
                                        ? "Tệ"
                                        : selectStarUsesBuy == 1
                                            ? "Không hài lòng"
                                            : selectStarUsesBuy == 2
                                                ? "Bình thường"
                                                : selectStarUsesBuy == 3
                                                    ? "Hài lòng"
                                                    : "Tuyệt vời"}
                                </span>
                            </div>
                        </div>

                        <div className={cx("service-rating-buy", "mb-2", "flex", "items-center")}>
                            <span
                                style={{ minWidth: "180px" }}
                                className={cx("text-sm", "flex", "items-center", "block")}>
                                Dịch vụ vận chuyển
                            </span>
                            <div className={cx("service-star", "rating-star", "flex", "items-center")}>
                                {[1, 2, 3, 4, 5].map((item, index) => {
                                    return (
                                        <div key={index} className={cx("flex", "items-center", "pl-1.5")}>
                                            <div
                                                onClick={() => {
                                                    handlerRatingTransport(index);
                                                }}
                                                className={cx("rating-stars")}>
                                                {index <= selectStarTransport ? <StarBold /> : <Star />}
                                            </div>
                                        </div>
                                    );
                                })}
                                <span className={cx("ml-2", "flex", "items-center")} style={{ fontSize: "14px" }}>
                                    {selectStarTransport == 0
                                        ? "Tệ"
                                        : selectStarTransport == 1
                                            ? "Không hài lòng"
                                            : selectStarTransport == 2
                                                ? "Bình thường"
                                                : selectStarTransport == 3
                                                    ? "Hài lòng"
                                                    : "Tuyệt vời"}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* service */}
                    <div className={cx("btn", "py-6", "px-8", "flex", "justify-end")}>
                        <button onClick={handlerBack} className={cx("back", "uppercase")}>
                            Trở Lại
                        </button>
                        <button onClick={handerlerSubmit} className={cx("success")} >
                            Hoàn Thành
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default ModelComment;
