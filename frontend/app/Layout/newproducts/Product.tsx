/** @format */

"use client";
/** @format */
import { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./NewProducts.module.scss";
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles);
import { AiFillEye } from "react-icons/ai";
function Product({ data, classNames, flexLike = false, index }) {
	const router = useRouter();
	const [hidden, setHidden] = useState(false);
	const [hiddenLike, setHiddenLike] = useState(false)
	const srcDefault = data.imgDefault;
	const [src, setSrc] = useState(srcDefault);
	const [price, setPrice] = useState(data.price)
	const [priceSale, setPriceSale] = useState(data.priceSale)
	const kqPrice = price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') + "₫"
	if (priceSale) {
		var kqPriceSale = data.priceSale.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') + "₫"
	}
	const kq = data.color.filter((item) => {
		return item.background
	})
	return (
		<div
			onClick={() => {
				router.push(`/Layout/newproducts/${data.name}`);
			}}
			onMouseLeave={() => {
				setHidden(false);
				setHiddenLike(false)
			}}
			className={cx("product", "relative", {
				[classNames]: classNames,
				"height-product": true
			})}>
			<div
				onMouseEnter={() => {
					setHidden(true);
					setHiddenLike(true)
				}}
				className={cx("images")}>
				<div className={cx("images-default", "cursor-pointer", "relative")}>
					{src == srcDefault ? (
						<img alt='anh1' src={src} />
					) : (
						<div>
							<img alt='anh1' src={src} />
							<div className={cx("label-new")}>
								<span>Hàng Mới</span>
							</div>
						</div>
					)}
				</div>
				<div className={cx("images-change", "absolute", "cursor-pointer")}>
					<div className={cx("label-new")}>
						<span>Hàng Mới</span>
					</div>
					<img alt='anh2' src={data.imgHover} />
				</div>
			</div>

			<div className={cx("information", "px-3", "py-3")}>
				<div
					onMouseEnter={() => {
						setHidden(true);
						setHiddenLike(true)
					}}
					className={cx("detail", "cursor-pointer")}>
					<span className={cx("title", "block", "text-center")}>{data.name}</span>
					{kqPriceSale ? <div className={cx("flex", "justify-center", "items-center", "mt-1.5")}>
						<del className={cx("pice-normal", "pr-5", "pl-3")} style={{ color: "#B4B4B4", fontSize: "14px" }}>{kqPrice}</del>
						<span style={{ color: "#FF0000" }} className={cx("price", "font-bold", "text-sm", "block", "text-center")}>
							{kqPriceSale}
						</span>
					</div> : <span style={{ color: "black", marginTop: "6px" }} className={cx("price", "font-bold", "text-sm", "block", "text-center")}>
						{kqPrice}
					</span>}
				</div>
				<div
					className={cx("choose-color", "py-2", "items-center", "justify-center", "text-center", {
						flex: hidden,
						flexLike: flexLike
					})}>
					{kq.map((item, index) => {
						return (
							<span
								key={index}
								onMouseLeave={() => {
									setSrc(srcDefault);
								}}
								onMouseEnter={() => {
									setHidden(true)
									setSrc(item.imgColor);
								}}
								className={cx("h-7", "w-7", "mr-5", "cursor-pointer", "rounded-full", "border-solid")}
								style={{
									backgroundImage: `url(${item.background})`,
									transition: "all 0.6 linear"
								}}></span>
						);
					})}
				</div>
			</div>

			{flexLike == true ? <button
				className={cx("btn-buy", "justify-center", "items-center", "cursor-pointer", "relative", {
					flexLike: hiddenLike,
				})}
				style={{ background: "black", fontSize: "13px", color: "white", padding: "7px 10px", width: "100%" }}>
				<AiFillEye style={{
					fontSize: "15px",
					marginRight: "6px"
				}} /> Xem chi tiết
			</button> : <button
				className={cx("btn-buy", "cursor-pointer", {
					block: true,
				})}
				style={{ background: "black", fontSize: "13px", color: "white", padding: "7px 10px", width: "40%" }}>
				MUA NGAY
			</button>}


		</div>
	);
}

export default Product;
