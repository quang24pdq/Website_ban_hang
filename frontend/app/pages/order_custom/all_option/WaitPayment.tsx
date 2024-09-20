import { useState, useEffect } from "react";
import styles from "../OrderCustom.module.scss"
import classnames from "classnames/bind"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"
import { IconCart, IconGuaran, IconQuery } from "../Icon";
import axios from "axios";
const cx = classnames.bind(styles)
function OrderWaitPay() {
    const router = useRouter();
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios({
                    method: "post",
                    url: "http://localhost:4000/order/user/wait_payment",
                    data: {
                        token: Cookies.get("token")
                    }
                })
                const result = request.data
                setData(result)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    })
    if (!loader) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx("height-fix")}>
            {data.length == 0 ? <div className={cx("wrapper_no_order")}>
                <div className={cx("no_order")}>
                    <div></div>
                    <h2 >Chưa có đơn hàng</h2>
                </div>
            </div> : <div className={cx("have_order")}>
                {data.map((item, index) => {
                    return (
                        <div key={index} className={cx("list_order")}>
                            <section>
                                <div className={cx("wrapper_information")}>
                                    <div className={cx("wrapper_transition")}>
                                        <p>Chi tiết đơn hàng</p>
                                        <div className={cx("information_transition")}>
                                            <div className={cx("transition")}>
                                                <span className={cx("icon_cart")}>
                                                    <IconCart />
                                                </span>
                                                <span className={cx("text")}> Đơn hàng đang chờ thanh toán</span>
                                                <span className={cx("icon_query")}><IconQuery /></span>
                                            </div>
                                            <span className={cx("status_transition")}>
                                                Chờ thanh toán
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx("line_information")}></div>
                                    <div className={cx("details_order")}>
                                        <div className={cx("description")}>
                                            <img src={item.color} alt="" />
                                            <div className={cx("product")}>
                                                <div>
                                                    <div className={cx("name")}>
                                                        <span>{item.name_product}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {item.size && <div className={cx("classify")}>
                                                        Phân loại hàng:size {item.size}
                                                    </div>}
                                                    <div className={cx('quantity')}>Số lượng:x{item.quantity}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx("description_price")}>
                                            <div className={cx("prices")}>
                                                <span className={cx("price_sale")}>₫{(item.price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className={cx("line")}></div>
                            <div className={cx("payment")}>
                                <div className={cx("flex", "justify-end", "items-center")}>
                                    <span><IconGuaran /></span>
                                    <label>Thành tiền:</label>
                                    <div className={cx("total_price")}>₫{(item.price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</div>
                                    <button onClick={() => {
                                        router.push("checkout")
                                    }} className={cx("buy")}>Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    );
}

export default OrderWaitPay;