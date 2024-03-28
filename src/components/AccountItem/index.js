import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../../components/Image';
import { Link } from 'react-router-dom';
import routesConfig from '../../config/routes';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link
            to={`profile/${data.nickname}`}
            className={cx('wrapper')}
        >
            <Image className={cx('avatar')} src={data.avatar} alt="Hoaa" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && (
                        <FontAwesomeIcon
                            className={cx('check')}
                            icon={faCheckCircle}
                        />
                    )}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
