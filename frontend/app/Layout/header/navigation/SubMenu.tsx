"use client";
import styles from "../Header.module.scss";
import classnames from "classnames/bind";
import Link from "next/link";
const cx = classnames.bind(styles);
function SubMenu({ hidden }) {
  return (
    <div
      className={cx("sub-menu", "fixed", "w-full", "left-0", "h-5/6", "py-4", {
        "sub-menu-block": hidden,
      })}>
      <div className={cx("container-xl", "h-5", "mx-auto", "grid", "grid-cols-6", "gap-x-6", "wrapper")}>
        <div className={cx("items")}>
          <Link href={"/pages_type/shoe"} className={cx("title", "uppercase", "text-sm", "py-3", "px-4", "block")}>
            Giày
          </Link>

        </div>
        <div className={cx("items")}>
          <Link href={"/pages_type/bag"} className={cx("title", "uppercase", "text-sm", "py-3", "px-4", "block")}>
            Túi
          </Link>

        </div>
        <div className={cx("items")}>
          <Link href={"/"} className={cx("title", "uppercase", "text-sm", "py-3", "px-4", "block")}>
            Phụ kiện
          </Link>
          <ul className={cx("list-item")}>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/glasses"} className={cx("hover:bg-nav-500")}>
                Mắt kính
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/socks"} className={cx("hover:bg-nav-500")}>
                Vớ
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/balo"} className={cx("hover:bg-nav-500")}>
                Balo
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/sandal"} className={cx("hover:bg-nav-500")}>
                Dép
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("items")}>
          <Link href={"/"} className={cx("title", "uppercase", "text-sm", "py-3", "px-4", "block")}>
            quần áo
          </Link>
          <ul className={cx("list-item")}>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/shirt"} className={cx("hover:bg-nav-500")}>
                Áo
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/trousers"} className={cx("hover:bg-nav-500")}>
                Quần
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/pages_type/dress"} className={cx("hover:bg-nav-500")}>
                Váy
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("items")}>
          <Link href={"/"} className={cx("title", "uppercase", "text-sm", "py-3", "px-4", "block")}>
            bộ sưu tập
          </Link>
          <ul className={cx("list-item")}>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <a href={"/"}>Panorama Diamond</a>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Panorama City
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Ldy Moon
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Feelin Fall
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Take Me To Summer
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Color Your Life
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                BST Túi Ngôn Tình{" "}
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Versatile Beauty
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Shake It Up
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                JoyFul
              </Link>
            </li>
            <li className={cx("item", "py-3", "px-4", "text-sm", "normal-case")}>
              <Link href={"/"} className={cx("hover:bg-nav-500")}>
                Unstoppable New Year
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("item")}></div>
      </div>
      <div
        className={cx("footer", "text-xs", "block", "w-full", "text-center", "relative")}
        style={{
          top: "95%",
        }}>
        Miễn phí giao hàng toàn quốc với hóa đơn từ 300.000 đồng | Thời gian đổi trả sản phẩm lên đến 30 ngày
      </div>
    </div>
  );
}

export default SubMenu;
