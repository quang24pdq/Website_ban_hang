import styles from "./DetailOrder.module.scss"
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
function DetailOrder({ data, visible }) {
    if (!data) {
        return <div>...Loader</div>
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <h2 className={cx('title', "uppercase")}>Chi tiết đơn hàng</h2>
                <section>
                    <div className={cx("detail_order", "mt-6")}>
                        <h3 className={cx("detail_order_title", "pb-3")}>Thông tin đơn hàng</h3>
                        <div className={cx("detail_order_description")}>
                            <div className={cx("shared")}>
                                <label>Mã giao dịch:</label>
                                <span>{data.code}</span>
                            </div>
                            <div className={cx("shared")}>
                                <label>Thông tin sản phẩm:</label>
                                <ul>
                                    {data.items.map((item, index) => {
                                        return (
                                            <li key={index}>{((item.price) * 1000).toLocaleString('vi-VN', { useGrouping: true })}đ - {item.status_transport} - {item.quantity} - {item.name_product}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className={cx("shared")}>
                                <label>Tổng giá trị đơn hàng:</label>
                                <span>{data.total_order.toLocaleString('vi-VN', { useGrouping: true })}đ</span>
                            </div>
                            <div className={cx("shared")}>
                                <label>Phương thức thanh toán:</label>
                                <span>{(data.status == "00") ? "Chuyển khoản" : "Tiền mặt"}</span>
                            </div>
                            <div className={cx("shared")}>
                                <label>Thời gian thực hiện thanh toán:</label>
                                <span>{data.pay_date}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={cx("detail_transport", "mt-6")}>
                        <h3 className={cx("detail_transport_title", "pb-3")}>Thông tin giao hàng:</h3>
                        <div className={cx("detail_transport_description")}>
                            <div className={cx("shared")}>
                                <label>Tên khách hàng:</label>
                                <span>{data.full_name}</span>
                            </div>
                            <div className={cx("shared")}>
                                <label>Số điện thoại:</label>
                                <span>{data.phone}</span>
                            </div>
                            <div className={cx("shared")}>
                                <label>Địa chị khách hàng:</label>
                                <span>{data.address}</span>
                            </div>
                            <div className={cx("shared")}>
                                <label>Ghi chú:</label>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={cx("status_order")}>
                        <label>Tình trạng:</label>
                        <span>{(data.status == "00") ? "Thành công" : "Thất bại"}</span>
                    </div>
                </section>
                <button onClick={() => {
                    visible(false)
                }} className={cx("btn_close")}>Đóng</button>
            </div>
        </div>
    );
}

export default DetailOrder;