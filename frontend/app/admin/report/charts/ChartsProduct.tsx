"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
function ChartProduct() {
    const [responsive, setResponsive] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsive = await axios({
                    method: "get",
                    url: 'http://localhost:4000/report/chart-products'
                })
                setResponsive(responsive.data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoader(true)
            }
        }
        fetchData()
    }, [])
    const dateValue = responsive.map((item, index) => {
        const kq = item.date.split(" ")[1]
        const result = kq.split("/")
        return result[0] + "/" + result[1]
    })
    if (!loader) {
        return <p>...Loader</p>
    }
    const data = [
        {
            name: dateValue[0],
            VND: responsive[0].data,
        },
        {
            name: dateValue[1],
            VND: responsive[1].data,
        },
        {
            name: dateValue[2],
            VND: responsive[2].data,
        },
        {
            name: dateValue[3],
            VND: responsive[3].data,
        },
        {
            name: dateValue[4],
            VND: responsive[4].data,
        },
        {
            name: dateValue[5],
            VND: responsive[5].data,
        },
        {
            name: dateValue[6],
            VND: responsive[6].data,
        },
    ];
    // custom tooltip 
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: "white",
                    padding: "8px 12px",
                    boxShadow: " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                    borderRadius: "4px"
                }} className="custom-tooltip">
                    <p className="label">{`Thời gian:  ${label}`}</p>
                    <p style={{ marginTop: "12px" }} className="intro">Thu nhập:  {payload[0].value.toLocaleString("vn-VN", { useGrouping: true })}đ</p>
                </div>
            );
        }

        return null;
    };
    //   
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="VND" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}


export default ChartProduct;