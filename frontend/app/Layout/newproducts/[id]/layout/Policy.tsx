"use client"
import "../../../../Globals.css";
import styles from "../DetailProduct.module.scss";
import classnames from "classnames/bind";
import { useState } from "react"
const cx = classnames.bind(styles);
function Policy() {
    const [check, setCheck] = useState(true)

    return (
        <div style={{
            padding: "0 100px",
            margin: "0 40.5px",
            marginTop: "36px"
        }} className={cx("product-tab", "mt-6", "mr-20")}>
            <ul className={cx("flex", "flex-row", "list")}>
                <li style={{
                    width: "30%"
                }} onClick={() => {
                    setCheck(!check)
                }} className={cx({
                    active: check,
                    "hover:bg-list": check
                })}>
                    Chính sách đổi trả
                </li>
                <li style={{
                    width: "30%"
                }} onClick={() => {
                    setCheck(!check)
                }} className={cx({
                    "active": !check,
                    "hover:bg-list": !check
                })}>Hướng dẫn bảo quản</li>
            </ul>
            <div className={cx('content', "relative", "mt-5")}>
                <p style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    width: "55%"
                }} className={cx("information", "relative", "text-base", "font-light", {
                    "visible": check
                })}>JUNO hiện đang áp dụng chính sách Đổi/Trả cho các sản phẩm như sau: <br />
                    - Trong vòng 30 ngày kể từ ngày nhận sản phẩm Túi, Ví, Giày (Hàng Nguyên Giá) <br />
                    - Trong vòng 7 ngày đối với sản phẩm Khuyến mãi <br />
                    - Phụ kiện (chỉ áp dụng với mắt kính, trang sức) và túi canvas được đổi/trả trong 7 ngày trong trường hợp có lỗi sản xuất <br />
                    - Không áp dụng đổi trả Online với đơn hàng tại hệ thống Cửa hàng Đại lý và Cửa hàng Juno tại TTTM Sense City Phạm Văn Đồng
                </p>
                <ul style={{
                    width: "30%",
                    top: "0"
                }} className={cx("detailPolicy", "absolute", {
                    "visible": !check
                })}>
                    <li className={cx()}>HƯỚNG DẪN BẢO QUẢN GIÀY >> Xem chi tiết</li>
                    <li className={cx()}>HƯỚNG DẪN BẢO QUẢN TÚI XÁCH >> Xem chi tiết</li>
                    <li className={cx()}>HƯỚNG DẪN BẢO QUẢN PHỤ KIỆN >> Xem chi tiết</li>
                </ul>
            </div>
        </div>
    );
}

export default Policy;