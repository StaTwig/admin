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
    const getMaxWidthAndLeftStyleValues = (type) => {
        if (type == 'role') {
            return {
                left: '18.5rem',
                maxWidth: '171px'
            }
        } else if (type == 'region') {
            return {
                left: '50.8rem',
                maxWidth: '171px'
            }
        } else if (type == 'country') {
            return {
                left: '40rem',
                maxWidth: '171px'
            }
        } else if (type == 'status') {
            return {
                left: '61.7rem',
                maxWidth: '170px'
            }
        } else if (type == 'createdOn') {
            return {
                left: '72.5rem',
                maxWidth: '171px'
            }
        } 
    }
    console.log(props)
    return (
        <div className={`card rounded bg-white border-white ${cardFormat}`} style={getMaxWidthAndLeftStyleValues(props.type)}>
            <SearchBar
                onChangeOfSearchInput={props.onChangeOfSearchInput}
                type={props.type}
            />
            <ul>
                {props?.data?.map(item => {
                    return (
                        <li key={item.key}>{item.value}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DropDownFilter;