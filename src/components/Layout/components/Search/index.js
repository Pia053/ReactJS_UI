import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../Poper';
import { SearchIcon } from '../../../Icons';
import AccountItem from '../../../AccountItem';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResilt] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setSearchResilt([1, 2, 3]);
        }, 0);
    }, []);

    // hanldeHideResult
    const handleHideResult = () => {
        setShowResult(false);
    };

    // hanldeClear
    const hanldeClear = () => {
        setSearchValue('');
        setSearchResilt([]);
        inputRef.current.focus();
    };

    // !searchValue = true ; !!searhValue = false
    // EG: !!value = null => false; !!value = "hello" => true

    /**
        Note HeadlessTippy/ visible: true: show/false:hide 
            onClickOutside: out click hide Tippy
     */

    // Logic:
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
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
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search account and video"
                    spellCheck="false"
                    onFocus={() => setShowResult(true)}
                ></input>

                {!!searchValue && (
                    <button onClick={hanldeClear} className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                    </button>
                )}

                {/* Loadding */}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner}></FontAwesomeIcon> */}
                <button className={cx('search-btn')}>
                    {/* search */}
                    <SearchIcon></SearchIcon>
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
