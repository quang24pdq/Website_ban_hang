import { AiOutlineLeft } from 'react-icons/ai';
import styles from './Collection.module.scss';
import classNames from 'classnames/bind';
import './Collection.module.scss';
const cx = classNames.bind(styles);
function ButtonPrev({ onClick }) {
    return (
        <span className={cx('btn__prev')} onClick={onClick}>
            <AiOutlineLeft />
        </span>
    );
}
export default ButtonPrev;
