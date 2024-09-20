import classNames from 'classnames/bind';
import styles from './FooterBottom.module.scss';
import { AiOutlineDown } from 'react-icons/ai';
import { useState } from 'react';
const cx = classNames.bind(styles);
function FooterBottom() {
    const [check, setCheck] = useState(false);
    const handlerClick = function () {
        setCheck(!check);
    };
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('footer-bottom', {
                    'height-auto': check,
                })}
            >
                <div className={cx('grid', "grid-cols-12", 'inner-infoFooter')}>
                    <div className={cx('custom-support', 'col-span-4')}>
                        <div className={cx('select')}>
                            <h4
                                className={cx('active-support', "flex")}
                                onClick={handlerClick}
                            >
                                HỖ TRỢ KHÁCH HÀNG
                                <AiOutlineDown
                                    style={{
                                        fontSize: 10,
                                        marginLeft: 4,
                                        fontWeight: 800,
                                        position: 'relative',
                                        top: "5px",
                                    }}
                                />
                            </h4>
                            <ul
                                className={cx('footer-bottom-list', {
                                    'd-block': check,
                                })}
                            >
                                <li>Hướng dẫn chọn cỡ giày</li>
                                <li>Chính sách đổi trả</li>
                                <li>Thanh toán giao nhận</li>
                                <li>Chính sách bảo mật</li>
                                <li>Câu hỏi thường gặp</li>
                                <li>Chính sách khách hàng thân thiết</li>
                                <li>Hướng dẫn mua hàng online</li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('info', 'col-span-4')}>
                        <div className={cx('select')}>
                            <h4
                                className={cx('active-support', "flex")}
                                onClick={handlerClick}
                            >
                                VỀ JUNO
                                <AiOutlineDown
                                    style={{
                                        fontSize: 10,
                                        marginLeft: 4,
                                        fontWeight: 800,
                                        position: 'relative',
                                        top: "5px",
                                    }}
                                />
                            </h4>
                            <ul
                                className={cx('footer-bottom-list', {
                                    'd-block': check,
                                })}
                            >
                                <li>Giới thiệu</li>
                                <li>Liên hệ</li>
                                <li>Tin tức Juno</li>
                                <li>Thông tin thời trang</li>
                                <li>Cơ hội làm việc tại Juno</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('footer-bar')}>
                <span className={cx('footer-bar-left')}>
                    © Công ty Cổ phần Seedcom Fashion Group
                </span>

                <div className={cx('footer-bar-right')}>
                    <img
                        alt=""
                        className={cx('logo')}
                        src="https://file.hstatic.net/1000003969/file/icon-dangky_ed795de8b131419393b256f6384de715.png"
                    />
                    <span className={cx('title')}>
                        Powered by Haravan Enterprise.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FooterBottom;
