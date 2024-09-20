import styles from "./Collection.module.scss"
import Slider from 'react-slick';
import ButtonNext from './ButtonNext';
import ButtonPrev from './ButtonPrev';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Collection() {
    var settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '180px',
        slidesToShow: 1,
        speed: 350,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        variableHeight: true,
        nextArrow: <ButtonNext />,
        prevArrow: <ButtonPrev />,
        appendDots: (dots) => (
            <div
                style={{
                    backgroundColor: 'transparent',
                    height: '50px',
                    padding: '10px',
                }}
            >
                <ul
                    style={{
                        margin: '0 ',
                    }}
                >
                    {dots}
                </ul>
            </div>
        ),
        customPaging: () => (
            <div className="box">
                <span
                    className="box2"
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '27px',
                        height: '2px',
                        cursor: 'pointer',
                        background: 'transparent',
                        border: '1px solid #E5E5E5',
                    }}
                ></span>
            </div>
        ),
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>BỘ SƯU TẬP</h2>
            <div className={cx('wrapper__video')}>
                <Slider  {...settings}>
                    <div className={cx('video')}>
                        <iframe
                            title="SHAKE IT UP"
                            loading="lazy"
                            className={cx('video__clone')}
                            src="https://www.youtube.com/embed/sD5dcuu70JA?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=sD5dcuu70JA&amps;controls=0&amp;showinfo=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                        <h2 className={cx('title-colection-slider')}>
                            SHAKE IT UP
                        </h2>

                        <p className={cx('des-colection-silder')}>
                            Nguồn cảm hứng rực rỡ, sống động từ Bữa tiệc được
                            tái hiện hoàn hảo trên từng chi tiết giày túi và
                            trang phục thời trang của bộ sưu tập Shake It Up! Cổ
                            vũ cho mỗi cô gái hãy khuấy động giai điệu thời
                            trang của chính mình mỗi ngày. Shake It Up!
                        </p>
                    </div>

                    <div className={cx('video')}>
                        <iframe
                            title="SUMMER TASTE"
                            loading="lazy"
                            className={cx('video__clone')}
                            src="https://www.youtube.com/embed/kWSux5Nw_LI?autoplay=1&mute=1&loop=1&playlist=kWSux5Nw_LI&controls=0&showinfo=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                        <h2 className={cx('title-colection-slider')}>
                            SUMMER TASTE
                        </h2>
                        <p className={cx('des-colection-silder')}>
                            Những chiếc túi kem thời trang, đầy cảm hứng từ
                            nhiều sắc màu ngọt ngào và xu hướng thời trang hè
                            2021, SUMMER TASTE COLLECTION là sự kết hợp mới nhất
                            của JUNO &amp; Miu Lê để mang đến thông điệp: Hãy
                            gạt đi những bận rộn, tận hưởng những trải nghiệm
                            &amp; hương vị mùa hè khi đang độ rực rỡ nhất.
                        </p>
                    </div>
                    <div className={cx('video')}>
                        <iframe
                            title="IMPERFECT PERFECTION"
                            loading="lazy"
                            className={cx('video__clone')}
                            src="https://www.youtube.com/embed/S7mWot0hgpU?autoplay=1&mute=1&loop=1&playlist=S7mWot0hgpU&controls=0&showinfo=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                        <h2 className={cx('title-colection-slider')}>
                            IMPERFECT PERFECTION
                        </h2>
                        <p className={cx('des-colection-silder')}>
                            Một năm 2020 không hoàn hảo, với thật nhiều thử
                            thách, vụn vỡ cuối cùng đã sắp qua đi. Đã đến lúc
                            nàng được nâng ly chúc mừng cho tinh thần mạnh mẽ,
                            lạc quan của bản thân
                        </p>
                    </div>
                    <div className={cx('video')}>
                        <iframe
                            title=" THE FOLD"
                            loading="lazy"
                            className={cx('video__clone')}
                            src="https://www.youtube.com/embed/9-4i8ROafNk?autoplay=1&mute=1&loop=1&playlist=9-4i8ROafNk&controls=0&showinfo=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                        <h2 className={cx('title-colection-slider')}>
                            THE FOLD
                        </h2>
                        <p className={cx('des-colection-silder')}>
                            THE FOLD Nếp gấp xu hướng thể hiện nét riêng Bộ sưu
                            tập độc quyền mùa Thu Đông chính thức ra mắt ngày
                            25.09.2020 dựa trên cảm hứng về cô nàng tự gấp nên
                            hình dáng mới thể hiện chính mình thật tự tin và bản
                            lĩnh.
                        </p>
                    </div>
                    <div className={cx('video')}>
                        <iframe
                            title="Juno Sneakers Thả Thính Tình Yêu"
                            loading="lazy"
                            className={cx('video__clone')}
                            src="https://www.youtube.com/embed/kWSux5Nw_LI?autoplay=1&mute=1&loop=1&playlist=kWSux5Nw_LI&controls=0&showinfo=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                        <h2 className={cx('title-colection-slider')}>
                            Juno Sneakers Thả Thính Tình Yêu
                        </h2>

                        <p className={cx('des-colection-silder')}>
                            5 nút thắt độc đáo, bắt điểm nhìn trên đôi JUNO
                            Sneakers như một ngôn ngữ thả thính mới: giúp nàng
                            khoe khéo status tình cảm, như nút thắt #SelfLove
                            dành cho cô nàng thích cuộc sống độc thân tự do!
                        </p>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Collection;
