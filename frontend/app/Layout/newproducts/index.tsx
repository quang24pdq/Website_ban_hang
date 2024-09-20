/** @format */

"use client";
import { useState, useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./NewProducts.module.scss";
import Product from "./Product";
import axios from "axios";
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles);
function NewProducts() {
	const router = useRouter()
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:4000/api/newProducts")
			.then((result) => {
				const kq = result.data.slice(0, 4)
				setData(kq)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	return (
		<div className={cx("wrapper", "py-8", "relative")}>
			<div className={cx("container-fluid", "mx-10", "px-24")}>
				<div className={cx("container-fluid-header", "py-6", "px-13", "text-center")}>
					<div className={cx("header", "py-6")}>
						<h2 className={cx("text-xl", "mb-1", "uppercase", "font-medium")}>HÀNG MỚI VỀ</h2>
						<h4 className={cx("text-lg", "mb-3", "font-light")}>
							Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ
						</h4>
					</div>
					<div className={cx("products", "grid", "grid-cols-4", "grid-rows-1", "gap-x-2.5", "gap-y-2")}>
						{data.map((item, index) => {
							return <div>
								<Product key={index} data={item} />
							</div>;
						})}
					</div>
				</div>
			</div>
			<div className={cx("view-all", "flex", "justify-center", "items-center")}>
				<p onClick={() => {
					router.push("pages/latestproducts")
				}} style={{ borderBottom: "1px solid black" }} className={cx("cursor-pointer", "uppercase", "text-sm", "py-1")}>Xem tất cả</p>
			</div>
		</div>
	);
}

export default NewProducts;
