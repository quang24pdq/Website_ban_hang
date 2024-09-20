import axios from "axios";
import styles from "./Table.module.scss"
import classnames from "classnames/bind"
import { useRouter } from "next/navigation";
const cx = classnames.bind(styles)
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
function Table({ data, load, length }) {
    const router = useRouter()
    const handleEdit = function (item) {
        router.push(`/admin/Product/updateProduct/${item._id}`)
    }
    const handleDelete = function (item) {
        axios({
            method: "post",
            url: "http://localhost:4000/api/products/delete",
            data: {
                id: item._id
            }
        })
            .then((data) => {

            })
        load()
    }
    if (!data) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <h3>Tổng  {length} sản phẩm </h3>
            </div>
            <div className={cx("table")}>
                <table className={cx('w-full')}>
                    <thead style={{
                        background: "silver"
                    }}>
                        <tr className={cx("grid", "grid-cols-12")}>
                            <th className={cx("col-span-2", "text-center", "flex", "items-center", "justify-center", "name-col")}>Hình ảnh</th>
                            <th className={cx("col-span-2", "text-center", "flex", "items-center", "justify-center", "name-col")}>Tên sản phẩm</th>
                            <th className={cx("col-span-1", "text-center", "flex", "items-center", "justify-center", "name-col")}>Mã sản phẩm</th>
                            <th className={cx("col-span-2", "text-center", "flex", "items-center", "justify-center", "name-col")}>Giá bán</th>
                            <th className={cx("col-span-1", "text-center", "flex", "items-center", "justify-center", "name-col")}>Giá khuyến mại</th>
                            <th className={cx("col-span-1", "text-center", "flex", "items-center", "justify-center", "name-col")}>Giá nhập</th>
                            <th className={cx("col-span-1", "text-center", "flex", "items-center", "justify-center", "name-col")}>Số lượng  nhập</th>
                            <th className={cx("col-span-1", "text-center", "flex", "items-center", "justify-center", "name-col")}>Đã bán</th>
                        </tr>
                    </thead>
                    <tbody style={{ display: "block" }}>
                        {data.map((item, index) => {
                            return (
                                <tr key={index} style={{ padding: "24px 0", borderBottom: "1px solid #cdc5c5" }} className={cx("grid", "grid-cols-12")}>
                                    <td className={cx("col-span-2", "text-center", "name-rows")}>
                                        <img src={item.imgDefault} alt="anh san pham" />
                                    </td>
                                    <td className={cx("col-span-2", "text-center", "name-rows")}>{item.name}</td>
                                    <td style={{ color: 'blue' }} className={cx("col-span-1", "text-center", "name-rows")}>{item.uniqueCode}</td>
                                    <td className={cx("col-span-2", "text-center", "name-rows")}>{((item.price) * 1000).toLocaleString("vn-VN", { useGrouping: true })}đ</td>
                                    <td style={{ color: "red" }} className={cx("col-span-1", "text-center", "name-rows")}>{(item.priceSale) ? ((item.priceSale) * 1000).toLocaleString("vn-VN", { useGrouping: true }) + "đ" : ""}</td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>{((item.import_price) * 1000).toLocaleString("vn-VN", { useGrouping: true })}đ</td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>{item.entered}</td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>{item.sold}</td>
                                    <td className={cx("col-span-1", "text-center", "name-rows")}>
                                        <span onClick={() => handleDelete(item)} className={cx("btn-delete")}><AiFillDelete /></span>
                                        <span onClick={() => handleEdit(item)} className={cx('btn-edit')}> <AiFillEdit /></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;