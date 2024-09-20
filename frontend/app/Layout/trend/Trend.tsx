"use client"
import classNames from 'classnames/bind';
import styles from './Trend.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../newproducts/Product';
import { useRouter } from 'next/navigation';
const cx = classNames.bind(styles);
function Trend() {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios({
                    method: "get",
                    url: "http://localhost:4000/api/products/trend",
                })
                const result = request.data.slice(0, 3)
                setData(result)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [])
    if (!loader) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx('wrapper')}>
            <hr style={{
                height: "2px",
                borderTop: "1px solid #eee",
            }}></hr>
            <h2 className={cx('title')}>TOP 20 SẢN PHẨM BÁN CHẠY NHẤT</h2>
            <div className={cx('products', "grid", "grid-cols-12", "gap-x-8")}>
                {data.map((item, index) => {
                    return (
                        <div key={index} className={cx('product-item', "col-span-4")}>
                            <Product data={item} />
                        </div>
                    )
                })}
            </div>
            <div className={cx("view-all", "flex", "justify-center", "items-center")}>
                <p onClick={() => { router.push("/pages/viewtrend") }} style={{ borderBottom: "1px solid black" }} className={cx("cursor-pointer", "uppercase", "text-sm", "py-1")}>Xem tất cả</p>
            </div>
            <hr
                style={{
                    opacity: 0.2,
                    marginBottom: "30px"
                }}
            />
        </div>
    );
}

export default Trend;
