import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../../../Globals.css";
import styles from "./Like.module.scss"
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../Product";
import { SampleNextArrowLike, SamplePrevArrowLike } from "./buttonLike"
const cx = classnames.bind(styles);
function Like({ data }) {
    const [responsive, setResponsive] = useState(null)
    const [errors, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const settings = {
        cssEase: "linear",
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrowLike />,
        prevArrow: <SamplePrevArrowLike />,
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: "http://localhost:4000/api/products/like",
                    data: {
                        type: data.type
                    }
                })
                setResponsive(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])
    if (loading) {
        return <p>Loading...</p>
    }
    if (errors) {
        return <p>Errors:{errors}</p>
    }
    return (
        <div style={{
            height: "600px",
            margin: "28px 140.5px",
            marginBottom: "92px"
        }} className={cx("like")}>
            <h2 style={{ fontSize: "23px", fontWeight: "400px", margin: "23px 0" }} className={cx("title", "text-center")}>Có thể nàng sẽ thích</h2>
            <div className={cx("wrapper")}>
                <Slider className="slick-like" {...settings}>
                    {responsive.map((item, index) => {
                        return <Product classNames={cx("like-product")} flexLike={true} data={item} key={index} />
                    })}
                </Slider>
            </div>
        </div>
    );
}

export default Like;