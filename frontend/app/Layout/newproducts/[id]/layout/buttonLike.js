import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
function SampleNextArrowLike(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={...className}
            style={{ ...style, top: "40%", display: "flex", border: "1px solid #e2e2e2", background: "white", width: "32px", height: "32px", borderRadius: "50%", justifyContent: 'center', alignItems: "center", right: "-4px" }}
            onClick={onClick}
        >
            <BsChevronRight style={{ fontSize: "25px", fontWeight: "bold" }} />
        </div>
    );
}

function SamplePrevArrowLike(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, top: "40%", display: "flex", border: "1px solid #e2e2e2", background: "white", width: "32px", height: "32px", borderRadius: "50%", justifyContent: 'center', alignItems: "center", left: "-20px" }}
            onClick={onClick}
        >
            <BsChevronLeft style={{ fontSize: "25px", fontWeight: "bold" }} />
        </div>
    );
}
export { SampleNextArrowLike, SamplePrevArrowLike }