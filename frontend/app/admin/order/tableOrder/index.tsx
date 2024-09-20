import axios from "axios";
import styles from "./tableOrder.module.scss"
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import { FaEye } from "react-icons/fa";
function TableOrder({ length, data, load, detailOrder, visible }) {
    const handleDetail = function (item) {
        detailOrder(item)
        visible(true)
    }
    const handleDeleteOrder = async function (item) {
        load()
        try {
            const requestApi = await axios({
                method: "post",
                url: "http://localhost:4000/order/delete-order",
                data: {
                    code: item.code
                }
            })
            const result = requestApi
        } catch (error) {
            console.log(error)
        }
    }
    if (!data) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <h3>{length} bản ghi được tìm thấy</h3>
            </div>
            <div className={cx("table")}>
                <table className={cx('w-full')}>
                    <thead style={{
                        background: "silver"
                    }}>
                        <tr className={cx("grid", "grid-cols-12")}>
                            <th className={cx("col-span-2", "text-center", "name-col")}>Mã đơn</th>
                            <th className={cx("col-span-2", "text-center", "name-col")}>Sản phẩm</th>
                            <th className={cx("col-span-1", "text-center", "name-col")}>Tình trạng</th>
                            <th className={cx("col-span-1", "text-center", "name-col")}>Người nhận</th>
                            <th className={cx("col-span-2", "text-center", "name-col")}>Địa chỉ giao hàng</th>
                            <th className={cx("col-span-1", "text-center", "name-col")}>Điện thoại</th>
                            <th className={cx("col-span-1", "text-center", "name-col")}>Tổng tiền</th>
                            <th className={cx("col-span-1", "text-center", "name-col")}>Thời gian tạo</th>
                            <th className={cx("col-span-1", "text-center", "name-col")}>Hình thức</th>
                        </tr>
                    </thead>
                    <tbody style={{ display: "block" }}>
                        {data.map((item, index) => {
                            return (
                                <tr key={index} style={{ padding: "24px 0", borderBottom: "1px solid #cdc5c5" }} className={cx("grid", "grid-cols-12")}>
                                    <td className={cx("col-span-2", "text-center", "name-rows", "flex-col")}>
                                        <div className={cx("flex", "justify-between")}>
                                            <span onClick={() => {
                                                handleDeleteOrder(item)
                                            }} className={cx("delete-order")}>Xóa</span>
                                            <span style={{
                                                display: "flex",
                                                alignItems: "center",
                                                minWidth: "67px",
                                                position: "relative",
                                                right: "24px",
                                                top: "24px"
                                            }} className={cx("code")}>{item.code}</span>
                                        </div>
                                        <button onClick={() => { handleDetail(item) }} className={cx("details")}><FaEye /></button>
                                    </td>
                                    <td className={cx("col-span-2", "text-center", "name-rows", "flex", "flex-col")}>
                                        {item.items.map((i, t) => {
                                            return (
                                                <span className={cx("hidden-text")}>{i.quantity}-{i.name_product}</span>
                                            )
                                        })}
                                    </td>
                                    <td style={{ color: 'blue' }} className={cx("col-span-1", "text-center", "name-rows")}>{item.status === "00" || item.status === "100" ? "Thành công" : "Thất bại"}</td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>{item.full_name}</td>
                                    <td title={item.address} style={{ color: "red", height: "auto", marginTop: 0 }} className={cx("col-span-2", "hidden-text", "text-center", "name-rows")}>{item.address}</td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>{item.phone}</td>
                                    <td style={{
                                        color: "red"
                                    }} className={cx("col-span-1", "text-center", "name-rows")}>
                                        {item.total_order.toLocaleString('vi-VN', { useGrouping: true })}đ
                                    </td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>
                                        {item.pay_date}
                                    </td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>
                                        {item.status === "100" ? "Tiền mặt" : "Chuyên khoản"}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableOrder;