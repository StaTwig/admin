import React, { useState } from 'react';
import SearchBar from '../searchBar';
import "./style.scss";
import useOnclickOutside from "react-cool-onclickoutside";

const DropDownFilter = (props) => {


    let ref = useOnclickOutside(() => {
        switch (props.type) {
            case 'orgType' :
                setShowDropDownForType(false);
                break;
            case 'country' :
                setShowDropDownForCountry(false);
                break;
            case 'region' :
                setShowDropDownForRegion(false);
                break;
            case 'status' :
                setShowDropDownForStatus(false);
                break;
            case 'createdOn' :
                setShowDropDownForCreatedOn(false);
                break;
            case 'role' :
                setShowDropDownForRole(false);
                break;
            case 'accountStatus' :
                setShowDropDownForAccountStatus(false);
                
            default:
                console.log("default values")
        }

    })
    

    const { setShowDropDownForType,
            setShowDropDownForCountry,
            setShowDropDownForRegion,
            setShowDropDownForStatus,
            setShowDropDownForCreatedOn,
            setShowDropDownForAccountStatus,
            setShowDropDownForRole
             } = props
     return (
        <div ref={ref}  className={`card rounded bg-white border-white role-card-container`} style={{left:"0rem",height:"auto",minHeight:"5rem",maxHeight:"15rem"}}>
            <SearchBar
                onChangeOfSearchInput={props.onChangeOfSearchInput}
                type={props.type}
            />
            <ul style={{overflowX:"hidden"}}>
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