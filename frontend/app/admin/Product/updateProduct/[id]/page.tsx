/** @format */
"use client"
import classnames from "classnames/bind"
import "../../../../Globals.css"
import styles from "../../../Admin.module.scss"
import { useState } from "react"
import axios from "axios"
const cx = classnames.bind(styles)

function UpdateProduct({ params }: { params: { id: string } }) {
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [priceSale, setPriceSale] = useState()
    const [type, setType] = useState()
    const [imgDefault, setImgDefault] = useState()
    const [imgHover, setImgHover] = useState()
    const [sizeString, setSizeString] = useState("")   // Array
    const size = sizeString.split(",")
    const [importPrice, setImportPrice] = useState()
    const [sold, setSold] = useState()
    const [entered, setEntered] = useState()
    // color

    const [imgColorDefault, setImgColorDefault] = useState()
    const [background, setBackground] = useState()
    const [imgColor, setImgColor] = useState()

    const [imgColorDefault1, setImgColorDefault1] = useState()
    const [background1, setBackground1] = useState()
    const [imgColor1, setImgColor1] = useState()

    const [imgColorDefault2, setImgColorDefault2] = useState()
    const [background2, setBackground2] = useState()
    const [imgColor2, setImgColor2] = useState()

    const color = [
        {
            imgColorDefault: imgColorDefault,
            background: background,
            imgColor: imgColor
        },
        {
            imgColorDefault: imgColorDefault1,
            background: background1,
            imgColor: imgColor1
        },
        {
            imgColorDefault: imgColorDefault2,
            background: background2,
            imgColor: imgColor2
        },
    ]
    // detail
    const [designs, setDesigns] = useState()
    const [quality, setQuality] = useState()
    const [colorDetail, setColorDetail] = useState()
    const [sizeDetail, setSizeDetail] = useState()
    const [origin, setOrigin] = useState()
    const [information, setInformation] = useState()
    const [height, setHeight] = useState()
    const detail = {
        designs: designs,
        quality: quality,
        colorDetail: colorDetail,
        sizeDetail: sizeDetail,
        origin: origin,
        information: information,
        height: height
    }
    const handlerSubmit = function () {
        axios({
            method: "post",
            url: "http://localhost:4000/api/products/update",
            data: {
                name: name,
                importPrice: importPrice,
                sold: sold,
                entered: entered,
                price: price,
                priceSale: priceSale,
                type: type,
                imgDefault: imgDefault,
                imgHover: imgHover,
                size: size,
                color: color,
                detail: detail,
                id: params.id
            }
        })

            .then((data) => {
                if (data.data.success) {
                    alert(data.data.message)
                }
            })
    }
    return (
        <div className={cx("wrapper", "mt-3", "flex", "flex-col", "ml-3")}>

            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }} placeholder="name" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={price} onChange={(e) => {
                setPrice(e.target.value)
            }} placeholder="price" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={importPrice} onChange={(e) => {
                setImportPrice(e.target.value)
            }} placeholder="import_price" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={sold} onChange={(e) => {
                setSold(e.target.value)
            }} placeholder="sold" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={entered} onChange={(e) => {
                setEntered(e.target.value)
            }} placeholder="entered" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={priceSale} onChange={(e) => {
                setPriceSale(e.target.value)
            }} placeholder="priceSale" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />

            <input value={type} onChange={(e) => {
                setType(e.target.value)
            }} placeholder="type" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={imgDefault} onChange={(e) => {
                setImgDefault(e.target.value)
            }} placeholder="imgDefault" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={imgHover} onChange={(e) => {
                setImgHover(e.target.value)
            }} placeholder="imgHover" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <input value={sizeString} onChange={(e) => {
                setSizeString(e.target.value)
            }} placeholder="size" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
            <div>
                color
                <div>
                    <input value={imgColorDefault} onChange={(e) => {
                        setImgColorDefault(e.target.value)
                    }} placeholder="imgColorDefault" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={background} onChange={(e) => {
                        setBackground(e.target.value)
                    }} placeholder="background" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={imgColor} onChange={(e) => {
                        setImgColor(e.target.value)
                    }} placeholder="imgColor" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                </div>
                <div>
                    <input value={imgColorDefault1} onChange={(e) => {
                        setImgColorDefault1(e.target.value)
                    }} placeholder="imgColorDefault" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={background1} onChange={(e) => {
                        setBackground1(e.target.value)
                    }} placeholder="background" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={imgColor1} onChange={(e) => {
                        setImgColor1(e.target.value)
                    }} placeholder="imgColor" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                </div>
                <div>
                    <input value={imgColorDefault2} onChange={(e) => {
                        setImgColorDefault2(e.target.value)
                    }} placeholder="imgColorDefault" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={background2} onChange={(e) => {
                        setBackground2(e.target.value)
                    }} placeholder="background" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={imgColor2} onChange={(e) => {
                        setImgColor2(e.target.value)
                    }} placeholder="imgColor" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                </div>
            </div>
            <div>
                detail:
                <div>
                    <input value={designs} onChange={(e) => {
                        setDesigns(e.target.value)
                    }} placeholder="designs" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={quality} onChange={(e) => {
                        setQuality(e.target.value)
                    }} placeholder="quality" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <input value={colorDetail} onChange={(e) => {
                        setColorDetail(e.target.value)
                    }} placeholder="color detail" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    <div>
                        <input value={sizeDetail} onChange={(e) => {
                            setSizeDetail(e.target.value)
                        }} placeholder="sizeDetail" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                        <input value={origin} onChange={(e) => {
                            setOrigin(e.target.value)
                        }} placeholder="origin" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                        <input value={information} onChange={(e) => {
                            setInformation(e.target.value)
                        }} placeholder="information" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                        <input value={height} onChange={(e) => {
                            setHeight(e.target.value)
                        }} placeholder="height" className={cx("px-1", "py-1", "border-solid", "border-black", "rounded", "border-2", "mb-2", "mr-2")} type="text" />
                    </div>
                </div>
            </div>
            <button onClick={handlerSubmit} className={cx("border-2", "border-solid", "border-black")}>Submit</button>
        </div>
    )
}

export default UpdateProduct
