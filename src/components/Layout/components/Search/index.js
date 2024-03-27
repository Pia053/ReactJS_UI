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
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    // if kiểm tra search value == "" and trim
    // encodeURIComponent(searchValue) mã hõa value = @#$%^^
    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResilt([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResilt(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchValue]);

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
            onClickOutside: click out hide Tippy
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
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result}></AccountItem>
                        ))}
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

                {/* Có search Nhưng không có loading */}
                {!!searchValue && !loading && (
                    <button onClick={hanldeClear} className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                    </button>
                )}

                {/* Loadding */}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}></FontAwesomeIcon>}

                <button className={cx('search-btn')}>
                    {/* search */}
                    <SearchIcon></SearchIcon>
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
