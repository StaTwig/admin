import React, { useState } from 'react';
import SearchBar from '../searchBar';
import "./style.scss";

const DropDownFilter = (props) => {
    let cardFormat = null;
    if (props.type === 'accountStatus') {
        cardFormat = 'account-status-card-container';
    } else if (props.type === 'role') {
        cardFormat = 'role-card-container';
    } else if (props.type === 'type') {
        cardFormat = 'role-card-container';
    } else {
        cardFormat = 'role-card-container';
    }
    
    return (
        <div className={`card rounded bg-white border-white ${cardFormat}`} style={{ left: '0rem' }}>
            <SearchBar
                onChangeOfSearchInput={props.onChangeOfSearchInput}
                type={props.type}
            />
            <ul>
                {props?.data?.map((item, index) => {
                    return (
                        <li 
                            className={item.checked ? "selected" : 'nonSelected'}
                            key={item.key} 
                            onClick={() => props.onClickOfDropDownItem(index, props.type, item.value)}
                        >
                            {item.value}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DropDownFilter;