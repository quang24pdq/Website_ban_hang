import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={...className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <BsChevronCompactRight />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <BsChevronCompactLeft />
        </div>
    );
}
export { SampleNextArrow, SamplePrevArrow }