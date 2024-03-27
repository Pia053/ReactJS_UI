import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../index.js';
import MenuItem from './MenuItems.js';

const cx = classNames.bind(styles);
function Menu({ children, items = [] }) {
    console.log(items);

    const renderItems = () => {
        return items.map((item, key) => {
            return <MenuItem key={key} data={item}></MenuItem>;
        });
    };

    return (
        <Tippy
            delay={[0, 700]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
