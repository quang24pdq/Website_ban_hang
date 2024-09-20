"use client"
import React, { PureComponent, use, useEffect, useState } from 'react';
import classnames from "classnames/bind"
import styles from "./Report.module.scss"
import ChartEnteredSold from './charts/ChartsEnterdSold';
import ChartProduct from './charts/ChartsProduct';
import Statistical from './statistical';
import CustomChartProduct from './charts/CustomChartProduct';
const cx = classnames.bind(styles)
function Report({ turnOn }) {
    const [date, setDate] = useState("")
    return (
        <div style={turnOn ? { visibility: "visible" } : { visibility: "hidden" }} className={cx("wrapper")}>
            <h3 className={cx("title")}>Báo cáo thống kê</h3>
            <Statistical />
            <div className={cx("content", 'grid', "gap-20", "grid-cols-12")}>
                <ChartEnteredSold />
                <div className={cx("col-span-7", "chart_product", "flex")}>
                    <div className={cx("flex", "items-center", "w-full")}>
                        <h3 className={cx("m-auto")} style={{ paddingTop: "32px", paddingBottom: "20px" }}>Biểu đồ doanh thu trong 7 ngày gần nhất </h3>
                        <input value={date} onChange={(e) => { setDate(e.target.value) }} className={cx("date")} type='date' />
                    </div>
                    {!date && <ChartProduct />}
                    {date && <CustomChartProduct date={date} />}
                </div>
            </div>
        </div >
    );
}
export default Report;