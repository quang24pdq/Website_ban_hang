import styles from "../Report.module.scss"
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { renderCustomizedLabel } from "./CustomLabel"
import { AiFillSkin } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
function ChartEnteredSold() {
    const [chartEnteredImport, setChartEnteredImport] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios({
                method: "get",
                url: 'http://localhost:4000/report/entered-sold',
            })
            const result = request.data
            setChartEnteredImport(result)
        }
        fetchData()
    }, [])

    const data = [
        { name: 'Entered', value: chartEnteredImport.total_entered },
        { name: 'Group D', value: chartEnteredImport.total_sold },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className={cx("col-span-5", "chart_product", "flex")}>
            <h3 style={{ paddingTop: "32px" }}>Tỷ lệ sản phẩm nhập và xuất</h3>
            <div style={{ width: "300px", height: "280px" }} className={cx("charts")}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart >
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className={cx("box")}>
                <div className={cx("flex", "items-center")}>
                    <div className={cx("box1")}></div>
                    <span style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "bold" }}>Số lượng phẩm nhập</span>
                </div>
                <div className={cx("flex", "items-center", "mt-5")}>
                    <div className={cx("box2")}></div>
                    <span style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "bold" }}>Số lượng phẩm bán</span>
                </div>
            </div>
            <div className={cx("explain")}>
                <div className={cx("line")}></div>
                <span>{chartEnteredImport.total_entered}</span>
            </div>
            <div className={cx("explain", "sold")}>
                <div className={cx("line")}></div>
                <span>{chartEnteredImport.total_sold}</span>
            </div>
        </div>
    );
}

export default ChartEnteredSold;