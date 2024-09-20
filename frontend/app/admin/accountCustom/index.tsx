"use client"
/** @format */
import styles from "../Admin.module.scss";
import classnames from "classnames/bind";
import { BsGear, BsFillPencilFill, BsTrash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BsArrowCounterclockwise, BsSearch } from "react-icons/bs";
import "./globalAdmin.css";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import ModelAdd from "./ModelAdd"
import ModelUpdate from "./ModelUpdate";
import PaginatedItems from "../pagenation";
const cx = classnames.bind(styles);
function AccountCustom({ turnOn }) {
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [loader, setLoader] = useState(false)
    const [refresh, setRefresh] = useReducer(x => x + 1, 0)
    const [hidden, setHidden] = useState(false)
    const [hid, setHid] = useState(true)
    const [modelHiddenUpdate, setModelHiddenUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [page, setPage] = useState(1)
    const [length, setLength] = useState(0)
    const handleUpdate = function (item) {
        setModelHiddenUpdate(true)
        setHid(false)
        setDataUpdate(item)
    }
    const modelHiddenUpdateCane = function () {
        setModelHiddenUpdate(false)
        setHid(true)
    }
    const handleAdd = function () {
        setHidden(true)
        setHid(false)
    }
    const modelHidden = function () {
        setHidden(false)
        setHid(true)
        setRefresh()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestApi = await axios({
                    method: "get",
                    url: "http://localhost:4000/accounts/total_users"
                })
                const result = requestApi.data
                setLength(result)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [])
    const handleDelete = async function (item) {
        try {
            const requestApi = axios({
                method: "post",
                url: "http://localhost:4000/accounts/delete",
                data: {
                    id: item._id
                }
            })
            const kq = requestApi
            setRefresh()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = async function () {
        try {
            const request = await axios({
                method: "post",
                url: "http://localhost:4000/accounts/findAccount",
                data: {
                    value: value
                }
            })
            const result = request.data
            if (result.length == 0) {
                alert("Không tìm thấy tài khoản")
            }
            else {
                setData(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchData = async function () {
            try {
                const requestApi = await axios({
                    method: "get",
                    url: `http://localhost:4000/accounts?page=${page}`
                })
                setData(requestApi.data)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [refresh])
    if (!loader) {
        return <p>...Loader</p>
    }
    return (
        <div className={cx("container")} style={turnOn ? { visibility: "visible" } : { visibility: "hidden" }}>
            <div className={cx("row", {
                "none": !hid
            })}>
                <h1 style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    margin: "20px 0"
                }} className={cx("text-center")}>Quản lí tài khoản khách hàng</h1>
                <div style={{ paddingLeft: "15px", marginLeft: "128.5px", marginBottom: "20px" }} className={cx("action-left", "flex")}>
                    <div className={cx("action-search", "flex")}>
                        <input value={value} onChange={(e) => {
                            if (e.target.value === " ") {
                                return
                            }
                            else {
                                setValue(e.target.value)
                            }
                        }} className={cx("search")} type="search" placeholder="Nhập email hoặc tên đăng nhập" />
                        <span className={cx("flex", "items-center", "justify-center")}></span>
                    </div>
                    <button disabled={(value == "" ? true : false)} onClick={handleSearch} className={cx("btn-search")}>Tìm kiếm</button>
                    <button onClick={() => {
                        window.location.reload()
                    }} className={cx("btn-reload")}><BsArrowCounterclockwise /></button>
                </div>

                <div className={cx("col-md-10 col-md-offset-1")}>
                    <div className={cx("panel panel-default panel-table")}>
                        <div className={cx("panel-heading")}>
                            <div className={cx("row")}>
                                <div className={cx("col col-xs-6")}>
                                    <h3
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            height: "50px",
                                            padding: "12px 22px",
                                        }}
                                        className={cx("panel-title")}>
                                        Danh sách khách hàng
                                    </h3>
                                </div>
                                <div style={{ height: "50px" }} className={cx("col col-xs-6 text-right")}>
                                    <button
                                        onClick={handleAdd}
                                        style={{
                                            margin: "10px 20px",
                                            backgroundColor: "#337ab7"
                                        }}
                                        type='button'
                                        className={cx("btn btn-sm btn-primary btn-create", "btn-add")}>
                                        Thêm mới
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx("panel-body")}>
                            <table className={cx("table table-striped table-bordered table-list")}>
                                <thead>
                                    <tr>
                                        <th>
                                            <em className={cx("flex", "justify-center")}>
                                                <BsGear />
                                            </em>
                                        </th>
                                        <th className={cx("hidden-xs")}>Mã số</th>
                                        <th>Tên đăng nhập</th>
                                        <th>Họ và tên</th>
                                        <th>Email</th>
                                        <th>Tình  trạng</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                {data.map((item, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td align='center'>
                                                    <a onClick={() => {
                                                        handleUpdate(item)
                                                    }} style={{ marginRight: "6px" }} title='Sửa thông tin' className={cx("btn btn-default")}>
                                                        <em className={cx("fa fa-pencil")}>
                                                            <BsFillPencilFill />
                                                        </em>
                                                    </a>
                                                    <a onClick={() => {
                                                        handleDelete(item)
                                                    }} title='Xóa tài khoản' className={cx("btn btn-danger")}>
                                                        <em className={cx("fa fa-trash")}>
                                                            <BsTrash />
                                                        </em>
                                                    </a>
                                                </td>
                                                <td className={cx("hidden-xs")}>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.full_name}</td>
                                                <td>{item.email}</td>
                                                <td>{(item.online) ? "online" : "offline"}</td>
                                                <td>{item.password}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ModelAdd modelHidden={modelHidden} hidden={hidden} />
            <ModelUpdate data={dataUpdate} hiddenUpdate={modelHiddenUpdateCane} modelHiddenUpdate={modelHiddenUpdate} />
            {!hidden && !modelHiddenUpdate && <PaginatedItems length={length} load={setRefresh} itemsPerPage={6} page={setPage} />}
        </div>
    );
}

export default AccountCustom;
