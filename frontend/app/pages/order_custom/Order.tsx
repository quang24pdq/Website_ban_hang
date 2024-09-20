/** @format */

"use client";
import styles from "./OrderCustom.module.scss";
import classnames from "classnames/bind";
import { IconCart, IconGuaran, IconQuery } from "./Icon";
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles);
function Order({ data }) {
    const router = useRouter();
    return (
        <div className={cx("height-fix")}>
            {data.length == 0 ? (
                <div className={cx("wrapper_no_order")}>
                    <div className={cx("no_order")}>
                        <div></div>
                        <h2>Chưa có đơn hàng</h2>
                    </div>
                </div>
            ) : (
                <div className={cx("have_order")}>
                    {data.map((item, index) => {
                        return (
                            <div key={item._id}>
                                {item.items.map((i, d) => {
                                    return (
                                        <div key={d} className={cx("list_order")}>
                                            <section>
                                                <div className={cx("wrapper_information")}>
                                                    <div className={cx("wrapper_transition")}>
                                                        <p>Chi tiết đơn hàng</p>
                                                        <div className={cx("information_transition")}>
                                                            <div className={cx("transition")}>
                                                                <span className={cx("icon_cart")}>
                                                                    <IconCart />
                                                                </span>
                                                                <span className={cx("text")}>
                                                                    {i.status_transport == "Đang giao hàng"
                                                                        ? "Đơn hàng đang được giao đến bạn"
                                                                        : i.status_transport == "Hủy giao hàng"
                                                                            ? "Đơn hàng đã bị hủy"
                                                                            : i.status_transport == "Hoàn thành"
                                                                                ? "Đơn hàng đã được giao thành công"
                                                                                : "Đơn hàng đang chờ thanh toán"}
                                                                </span>
                                                                <span className={cx("icon_query")}>
                                                                    <IconQuery />
                                                                </span>
                                                            </div>
                                                            <span className={cx("status_transition")}>
                                                                {i.status_transport}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={cx("line_information")}></div>
                                                    <div className={cx("details_order")}>
                                                        <div className={cx("description")}>
                                                            <img src={i.color} alt='' />
                                                            <div className={cx("product")}>
                                                                <div>
                                                                    <div className={cx("name")}>
                                                                        <span>{i.name_product}</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {i.size && (
                                                                        <div className={cx("classify")}>
                                                                            Phân loại hàng:size {i.size}
                                                                        </div>
                                                                    )}
                                                                    <div className={cx("quantity")}>
                                                                        Số lượng:x{i.quantity}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className={cx("description_price")}>
                                                            <div className={cx("prices")}>
                                                                <span className={cx("price_sale")}>
                                                                    ₫
                                                                    {i.price
                                                                        .toFixed(3)
                                                                        .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div className={cx("line")}></div>
                                            <div className={cx("payment")}>
                                                <div className={cx("flex", "justify-end", "items-center")}>
                                                    <span>
                                                        <IconGuaran />
                                                    </span>
                                                    <label>Thành tiền:</label>
                                                    <div className={cx("total_price")}>
                                                        ₫{i.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            router.push(`/Layout/newproducts/${i.name_product}`);
                                                        }}
                                                        className={cx("buy")}>
                                                        Xem sản phẩm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Order;
