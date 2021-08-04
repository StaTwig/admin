import React, { useState, useEffect } from 'react';
import './style.scss';
import SearchIcon from '../../assets/icons/searching@2x.png';

const SearchBar = (props) => {

    const debounceInterval = 300;
    const [query, setQuery] = useState('');
    const [ timer, setTimer] = useState();

    //debounce logic
    useEffect(() => {
        if (timer) {
          clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            props.onChangeOfSearchInput(query, props.type);
        }, debounceInterval));
      }, [query]);
    
    const handleOnChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form>
            <div className='searchInput-container'>
                <input
                    className={props.type === 'searchBarTopPanel' ?
                        'search-input-standard' : 'search-input-for-dropDown'}
                    type="text"
                    id="header-search"
                    placeholder="Search"
                    value={query}
                    onChange={handleOnChange}
                />
                <img src={SearchIcon} alt='searchIcon' id={props.type === 'searchBarTopPanel' 
                    ? 'input_img' : 'input_img_for_drp'} />
            </div>
        </form>
    )
}

export default SearchBar;