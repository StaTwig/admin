import React from 'react';
import './style.scss';

const SearchBar = (props) => {
    return (
        <form>
            <input
                className={props.type === 'searchBarTopPanel' ? 'search-input-standard': 'search-input-for-dropDown'}
                type="text"
                id="header-search"
                placeholder="Search"
                onChange={(event) => props.onChangeOfSearchInput(event, props.type)}
            />
        </form>
    )
}

export default SearchBar;