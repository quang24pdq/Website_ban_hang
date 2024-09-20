/** @format */

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import {AiFillFacebook, AiFillInstagram, AiFillYoutube} from "react-icons/ai";
const cx = classNames.bind(styles);
function FooterTop({line = true}) {
	return (
		<div className={cx("footer")}>
			{line && (
				<hr
					style={{
						height: "2px",
						margin: "20px 105px",
						borderTop: "1px solid #eee",
					}}></hr>
			)}
			<div className={cx("wrapper", "grid", "grid-cols-12")}>
				<div className={cx("contact", "col-span-4")}>
					<div className={cx("call__buy")}>
						<p className={cx("title")}>gọi mua hàng online(08:00 - 21:00 mỗi ngày)</p>
						<a href='tel:0344622670' className={cx("phone")}>
							0344622670
						</a>
						<p className={cx("working__time")}>Tất cả các ngày trong tuần(Trừ tết Âm Lịch)</p>
					</div>
					<div className={cx("support")}>
						<p className={cx("sp__title")}>gọi mua hàng online(08:00 - 21:00 mỗi ngày)</p>
						<a href='tel:0344622670' className={cx("sp__phone")}>
							0344622670
						</a>
						<p className={cx("working__time")}>Tất cả các ngày trong tuần(Trừ tết Âm Lịch)</p>
					</div>
				</div>

				<div className={cx("map", "col-span-4")}>
					<h4 className={cx("map__title")}>HỆ THỐNG SHOWROOM</h4>
					<img
						alt=''
						style={{maxWidth: "100%"}}
						className={cx("map_images")}
						src='https://file.hstatic.net/1000003969/file/chikh_ce44b1a9f11b4cbda1d4d319967d7932.jpg'
					/>
				</div>

				<div className={cx("fanpage", "col-span-4")}>
					<h4 className={cx("fanpage__title")}>FANPAGE CỦA CHÚNG TÔI</h4>
					<img
						alt=''
						className={cx("fapage__images")}
						style={{maxWidth: "100%"}}
						src='https://file.hstatic.net/1000003969/file/700x330_a5c00200864748bf952083cf1788de3c.png'
					/>
					<div className={cx("social")}>
						<span className={cx("social__face")}>
							<AiFillFacebook />
						</span>
						<span className={cx("social__instagram")}>
							<AiFillInstagram />
						</span>
						<span className={cx("social__youtube")}>
							<AiFillYoutube />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FooterTop;
