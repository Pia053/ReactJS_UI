import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../assets/images';
import Image from '../../../../components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMagnifyingGlass,
    faMessage,
    faSignIn,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
// tippy === boostrap
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';

import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from '../../../Poper';
import AccountItem from '../../../AccountItem';
import Button from '../../../Button';
import Menu from '../../../Poper/Menu';
import { MessageIcon, SearchIcon, UploadIcon } from '../../../Icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { type: 'language', code: 'en', title: 'English' },
                { type: 'language', code: 'vn', title: 'Việt Nam' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard shortcuts',
    },
];
function Header() {
    const [searchResult, setSearchResilt] = useState([]);
    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
        switch (menuItem.type) {
            case 'lamguage':
                break;
            default:
        }
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResilt([1, 2, 3]);
    //     }, 3000);
    // }, []);

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
            title: 'View profile',
            to: '/@hoa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="logo"></img>

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Account</h4>
                                <AccountItem></AccountItem>
                                <AccountItem></AccountItem>
                                <AccountItem></AccountItem>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search account and video" spellCheck="false"></input>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                        </button>
                        {/* Loadding */}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner}></FontAwesomeIcon>
                        <button className={cx('search-btn')}>
                            {/* search */}
                            <SearchIcon></SearchIcon>
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy trigger="click" placement="bottom" content="Upload Video">
                                <button className={cx('action-btn')}>
                                    <UploadIcon></UploadIcon>
                                </button>
                            </Tippy>
                            <Tippy trigger="click" placement="bottom" content="Message">
                                <button className={cx('action-btn')}>
                                    <MessageIcon></MessageIcon>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button to="/login" primary leftIcon={<FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>}>
                                Log In
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/000717011e758247a043a84990d1522c.jpeg?lk3s=a5d48078&x-expires=1711648800&x-signature=lhyTh5d7F8Bkcb7cznRmrpfFfWg%3D"
                                alt="Hoaa"
                                fallback=""
                            ></Image>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
