import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../index.js';
import MenuItem from './MenuItems.js';
import Header from './Header.js';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
    hideOnClick = false,
    children,
    items = [],
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, key) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                    key={key}
                    data={item}
                ></MenuItem>
            );
        });
    };

    return (
        <Tippy
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            offset={[12, 8]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() =>
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    )
                                }
                            ></Header>
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
