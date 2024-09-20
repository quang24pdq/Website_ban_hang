import { AiOutlineRight } from 'react-icons/ai';
import styles from './Collection.module.scss';
import classNames from 'classnames/bind';
import './Collection.module.scss';
const cx = classNames.bind(styles);
function ButtonNext({ onClick }) {
    return (
        <span className={cx('btn__next')} onClick={onClick}>
            <AiOutlineRight />
        </span>
    );
}

export default ButtonNext;
