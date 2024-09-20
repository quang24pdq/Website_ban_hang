"use client";
import styles from "../Header.module.scss";
import classnames from "classnames/bind";
import Link from "next/link";
import { useState } from "react";
import SubMenu from "./SubMenu";
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles);
function Navigation() {
  const [hidden, setHidden] = useState(false);
  const router = useRouter()
  return (
    <nav className={cx("navigation")}>
      <Link
        href={"/pages/latestproducts"}
        className={cx("link", "mx-5", "relative", "px-1", "py-5", "text-sm", "uppercase", "hover:bg-nav-500")}>
        Hàng mới
      </Link>
      <Link
        onMouseEnter={() => {
          setHidden(true);
        }}
        onMouseLeave={() => {
          setHidden(false);
        }}
        href={"/"}
        className={cx("link", "mx-5", "relative", "px-1", "py-5", "text-sm", "uppercase", "hover:bg-nav-500")}>
        Sản phẩm
        <SubMenu hidden={hidden} />
      </Link>
      <Link
        href={"/"}
        className={cx("link", "mx-5", "relative", "px-1", "py-5", "text-sm", "uppercase", "hover:bg-nav-500")}>
        Best panorama diamond
      </Link>
      <Link
        href={"/pages/sales"}
        className={cx(
          "link",
          "mx-5",
          "relative",
          "px-1",
          "py-5",
          "text-sm",
          "uppercase",
          "color-red4000",
          "hover:bg-nav-red"
        )}>
        sale
      </Link>
      <Link
        href={"/"}
        className={cx(
          "link",
          "mx-5",
          "relative",
          "px-1",
          "py-5",
          "text-sm",
          "uppercase",
          "color-red4000",
          "hover:bg-nav-red"
        )}>
        sale quần áo từ 99k
      </Link>
      <Link
        href={"/"}
        className={cx("link", "mx-5", "relative", "px-1", "py-5", "text-sm", "uppercase", "hover:bg-nav-500")}>
        showroom
      </Link>
    </nav >
  );
}

export default Navigation;
