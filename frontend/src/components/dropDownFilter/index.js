import React, { useState } from 'react';
import SearchBar from '../searchBar';
import "./style.scss";
import useOnclickOutside from "react-cool-onclickoutside";

const DropDownFilter = (props) => {

    const ref = useOnclickOutside(() => {
        setCloseDropdown(false);
      })
    
      const [ closeDropdown, setCloseDropdown] = useState(props.referance)
      
     return (
        <div ref={ref}  className={`card rounded bg-white border-white role-card-container`} style={{ left: '0rem' }}>
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