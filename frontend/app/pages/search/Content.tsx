import Product from "@/app/Layout/newproducts/Product";
import styles from "./Search.module.scss"
import classnames from "classnames/bind"
import Cookies from "js-cookie"
const cx = classnames.bind(styles)
function Content({ data }) {
    if (!data) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx("wrapper")} >
            <div className={cx("content")}>
                <div className={cx("title")}>
                    <h1>Tìm kiếm</h1>
                    <span className={cx("length")}>
                        Có {data.length} sản phẩm cho tìm kiếm
                    </span>
                    <span className={cx("line")}></span>
                </div>
                <p className={cx('subs-text')}>Kết quả tìm kiếm cho <b>"{Cookies.get("value-search")}"</b>.</p>
                <section>
                    <div className={cx("products", "mt-20", "gap-12", "grid", "grid-cols-12")}>
                        {data.map((item, index) => {
                            return <div key={index} className={cx("col-span-3")}>
                                <Product index={index} data={item} />
                            </div>
                        })
                        }
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Content;