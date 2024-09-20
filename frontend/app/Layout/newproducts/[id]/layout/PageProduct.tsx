"use client"
import styles from "../DetailProduct.module.scss";
import classnames from "classnames/bind";
import { BsCartPlus } from "react-icons/bs";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"
import axios from "axios";
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles);
function PageProduct({ data }) {
    const router = useRouter()
    const [count, setCount] = useState(1)
    const [check, setCheck] = useState(true)
    const [img, setImg] = useState()
    const [img1, setImg1] = useState()
    const [options, setOptions] = useState(null)
    const [optionSize, setOptionSize] = useState(null)
    const [userName, setUserName] = useState(null)
    const [price, setPrice] = useState(data.price)
    const [priceSale, setPriceSale] = useState(data.priceSale)
    //  them san pham
    const [checkOption, setCheckOption] = useState(Number)
    const [chooseSize, setChooseSize] = useState(null)
    const [chooseColor, setChooseColor] = useState(null)
    const kqPrice = price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') + "₫"
    if (priceSale) {
        var kqPriceSale = data.priceSale.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') + "₫"
    }
    const postCart = async function () {
        try {
            const requestApi = await axios({
                method: "post",
                url: "http://localhost:4000/cart/addcart",
                data: {
                    user_name: userName,
                    name_product: data.name,
                    price: data.priceSale ? data.priceSale : data.price,
                    image: data.imgDefault,
                    size: chooseSize,
                    color: chooseColor,
                    quantity: count
                }
            })
            const result = requestApi
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (Cookies.get("user_name")) {
            setUserName(Cookies.get("user_name"))
        }
    }, [])
    useEffect(() => {
        if (data.color[0] == "" && data.size[0] != "") {
            setCheckOption(1)
        }
        else if (data.color[0] != "" && data.size[0] == "") {
            setCheckOption(2)
        }
        else if (data.color[0] != "" && data.size[0] != "") {
            setCheckOption(3)
        }
    }, [])
    const handleAddCart = function () {
        if (!Cookies.get("token")) {
            alert("You need to login")
        }
        else {
            if (checkOption != 0) {
                if (checkOption == 1) {
                    if (chooseSize == null) {
                        alert("Vui long chon size")
                    }
                    else {
                        postCart()
                        window.location.reload()
                    }
                }
                else if (checkOption == 2) {
                    if (chooseColor == null) {
                        alert("Vui long chon mau")
                    }
                    else {
                        postCart()
                        window.location.reload()

                    }
                }
                else if (checkOption == 3) {
                    if (chooseColor == null || chooseSize == null) {
                        alert("Vui long chon ca size va mau sac")
                    }
                    else {
                        postCart()
                        window.location.reload()
                    }
                }
            }
            else {
                postCart()
                window.location.reload()

            }
        }
    }
    const handleBuy = function () {
        if (!Cookies.get("token")) {
            alert("You need to login")
        }
        else {
            if (checkOption != 0) {
                if (checkOption == 1) {
                    if (chooseSize == null) {
                        alert("Vui long chon size")
                    }
                    else {
                        postCart()
                        router.push("/pages/checkout")
                    }
                }
                else if (checkOption == 2) {
                    if (chooseColor == null) {
                        alert("Vui long chon mau")
                    }
                    else {
                        postCart()
                        router.push("/pages/checkout")

                    }
                }
                else if (checkOption == 3) {
                    if (chooseColor == null || chooseSize == null) {
                        alert("Vui long chon ca size va mau sac")
                    }
                    else {
                        postCart()
                        router.push("/pages/checkout")
                    }
                }
            }
            else {
                postCart()
                router.push("/pages/checkout")
            }
        }
    }
    // het them san pham
    const color = data.color.filter((item) => {
        return item.background != null
    })
    const size = data.size.filter((item) => {
        return item != ""
    })
    return (
        <div className={cx("page-product")}>
            <div className={cx("container", "grid", "grid-cols-12")}>
                <div className={cx("col-span-8", "grid-cols-2", "grid", "gap-x-1.5", "pr-28")}>
                    <img
                        className={cx()}
                        src={img ? img : data.imgDefault}
                    />
                    <img
                        className={cx()}
                        src={img1 ? img1 : data.imgHover}
                    />
                </div>
                <div className={cx("col-span-4", "flex", "flex-col", "pt-6")}>
                    <span className={cx("name", "text-base", "font-medium")}>{data.name}</span>
                    <div className={cx("price", "pb-3", "text-sm")}>
                        {priceSale ? <div className={cx("mt-2")}>
                            <del className={cx("pice-normal", "pr-5", "pl-3")} style={{ color: "#B4B4B4" }}>{kqPrice}</del>
                            <span className={cx("price-sale")} style={{ color: "#FF0000" }}>{kqPriceSale}</span>
                        </div> : <span className={cx("price-sale")} style={{ color: "black", marginTop: "8px", display: "block" }}>{kqPrice}</span>}
                    </div>
                    <div className={cx("choose-color", "py-3", "flex")}>
                        {color.map((item, index) => {
                            return (
                                <input
                                    readOnly
                                    value={index}
                                    onClick={(e) => {
                                        setOptions(e.target.value)
                                        setChooseColor(item.imgColorDefault)
                                        setImg(item.imgColor)
                                        setImg1(item.imgColorDefault)
                                    }} key={index} className={cx("color")} tabIndex="0" style={(index == options) ? { backgroundImage: `url(${item.background})`, border: "2px solid #8e8d8d" } : { backgroundImage: `url(${item.background})`, }}></input>
                            )
                        })}
                    </div>
                    <div className={cx("choose-size", "flex", "py-3")}>
                        {size.map((size, index) => {
                            return (
                                <span dataIndex={index} onClick={(e) => {
                                    setOptionSize(e.target.attributes.dataIndex.value)
                                    setChooseSize(size)
                                }} style={(index == optionSize) ? { border: "1px solid #8e8d8d" } : {}} key={index} className={cx("size")}>{size}</span>
                            )
                        })}
                    </div>
                    <div className={cx("buy", "mt-4")}>
                        <div className={cx("choose-quantity", "flex")}>
                            <span className={cx("quantity", "flex", "items-center")}>Số lượng</span>
                            <div className={cx("control-quantity")}>
                                <span onClick={() => {
                                    if (count == 1) {
                                        setCount(1)
                                    }
                                    else {
                                        setCount(count - 1)
                                    }
                                }} className={cx("subs")}>-</span>
                                <span className={cx("numbers")}>{count}</span>
                                <span onClick={() => {
                                    if (count < (data.entered) - data.sold) {
                                        setCount(count + 1)
                                    }
                                    else {
                                        setCount(data.entered - data.sold)
                                    }
                                }} className={cx("add")}>+</span>
                            </div>
                            <div className={cx("total-product", "flex", "items-center", "text-sm", "ml-4")}>{(data.entered) - data.sold} sản phẩm có sẵn</div>
                        </div>
                        <span style={{ display: "block", marginTop: "24px", fontWeight: "bold", color: "rgba(0,0,0,.26)", fontSize: "14px" }}>Đã bán:{data.sold}</span>
                        <div className={cx("btn", "grid", "grid-cols-2", "mt-8", "gap-x-5", "mr-8")}>
                            <button onClick={handleAddCart} className={cx("btn-addCart", "flex", "items-center", "justify-center")}>
                                <span><BsCartPlus /></span>
                                Thêm vào giỏ hàng
                            </button>
                            <button onClick={handleBuy} className={cx("btn-buy")}>
                                Mua ngay
                            </button>
                        </div>

                        <div className={cx("mt-5")}>
                            <h3 className={cx("text-xs", "uppercase")}>Miễn phí giao hàng toàn quốc</h3>
                            <span className={cx("text-xs")}>(Cho hóa đơn từ 300.000đ)</span>
                        </div>

                        <div className={cx("mt-5")}>
                            <h3 className={cx("text-xs", "uppercase")}>Đổi trả dễ dàng</h3>
                            <span className={cx("text-xs")}>(Đổi trả trong 7 ngày với lỗi do nhà sản xuất)</span>
                        </div>

                        <div className={cx("mt-5")}>
                            <h3 className={cx("text-xs", "uppercase")}>Tổng đài bán hàng 18001162</h3>
                            <span className={cx("text-xs")}>(Miễn phí từ 8h00-21:00 mỗi ngày)</span>
                        </div>

                        <div className={cx("product-tab", "mt-6", "mr-20")}>
                            <ul className={cx("flex", "flex-row", "grid", "grid-cols-2", "list")}>
                                <li onClick={() => {
                                    setCheck(!check)
                                }} className={cx({
                                    active: check,
                                    "hover:bg-list": check
                                })}>
                                    Mô tả sản phẩm
                                </li>
                                <li onClick={() => {
                                    setCheck(!check)
                                }} className={cx({
                                    "active": !check,
                                    "hover:bg-list": !check
                                })}>Chi tiết</li>
                            </ul>
                            <div className={cx('content', "relative", "mt-5")}>
                                <p className={cx("information", "absolute", "text-base", "font-light", {
                                    "visible": check
                                })}>{data.detail.information}</p>
                                <ul className={cx("detail", {
                                    "visible": !check
                                })}>
                                    {(data.uniqueCode != undefined) ? <li className={cx("info", "mb-1")}>Mã sản phẩm: {data.uniqueCode}</li> : <></>}
                                    {(data.detail.designs != undefined) ? <li className={cx("info", "mb-1")}>Kiểu dáng: {data.designs}</li> : <></>}
                                    {(data.detail.quality != undefined) ? <li className={cx("info", "mb-1")}>Chất liệu: {data.quality}</li> : <></>}
                                    {(data.detail.colorDetail != undefined) ? <li className={cx("info", "mb-1")}>Màu sắc: {data.detail.colorDetail}</li> : <></>}
                                    {(data.detail.sizeDetail != undefined) ? <li className={cx("info", "mb-1")}>Kích cỡ: {data.detail.sizeDetail}</li> : <></>}
                                    {(data.detail.height != undefined) ? <li className={cx("info", "mb-1")}>Độ cao: {data.detail.height}</li> : <></>}
                                    {(data.detail.origin != undefined) ? <li className={cx("info", "mb-1")}>Xuất xứ: {data.detail.origin}</li> : <></>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageProduct;