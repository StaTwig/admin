import React, { useEffect, useState } from 'react';
import SearchBar from '../searchBar';
import "./style.scss";
import useOnclickOutside from "react-cool-onclickoutside";
import { t } from "i18next";
const DropDownFilter = (props) => {

    let ref = useOnclickOutside(() => {
        switch (props.type) {
            case 'orgType':
                setShowDropDownForType(false);
                break;
            case 'country':
                setShowDropDownForCountry(false);
                break;
            case 'region':
                setShowDropDownForRegion(false);
                break;
            case 'status':
                setShowDropDownForStatus(false);
                break;
            case 'createdOn':
                setShowDropDownForCreatedOn(false);
                break;
            case 'role':
                setShowDropDownForRole(false);
                break;
            case 'accountStatus':
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
    const [suggItemIndex, setSuggItemIndex] = useState(-1);
    const length = props.data.length;

    useEffect(() => {
        if (suggItemIndex < 0) return;
        for (let index = 0; index < props.data.length; index++) {
            document.getElementsByClassName(`sugg-item${index}`)[0].classList.remove('selected')
        }
        document.getElementsByClassName(`sugg-item${suggItemIndex}`)[0].classList.add('selected');
    }, [suggItemIndex])

    const handleSearcherInputKeyDown = (e, type) => {
        // 40 => down, 38 => up
        if (e.keyCode === 40 && suggItemIndex < props.data.length - 1) {
            setSuggItemIndex(prevValue => prevValue + 1);
        } else if (e.keyCode === 38 && suggItemIndex > 0) {
            setSuggItemIndex(prevValue => prevValue - 1);
        } else if (e.keyCode === 13) {
            e.preventDefault();  
            const value = document.getElementsByClassName(`sugg-item${suggItemIndex}`)[0].innerText
            console.log("Enter value ",value);
            props.onChangeOfSearchInput(value, type);
            props.onClickOfDropDownItem(suggItemIndex, type, value);
        }
    }


    return (
        <div ref={ref} className={`card rounded bg-white border-white role-card-container`} style={{ left: "unset", height: "auto", minHeight: "5rem", maxHeight: "15rem" }}>
            <SearchBar
                onChangeOfSearchInput={props.onChangeOfSearchInput}
                type={props.type}
                handleSearcherInputKeyDown={handleSearcherInputKeyDown}
                setSuggItemIndex={setSuggItemIndex}
            />
            <ul>
                {props?.data?.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`sugg-item${index}`}
                            onClick={() => props.onClickOfDropDownItem(index, props.type, item.value)}
                        >
                            {t(item.value)}
                        </li>
                    )
                })}
                <li 
                    className={`sugg-item${length}`}
                    onClick={() => props.onClickOfDropDownItem("", "", "")}
                >
                    {t('Clear')}
                </li>
            </ul>
        </div>
    )
}


export default DropDownFilter;