import React from 'react';
import './style.scss';

const FilterDropDown = (props) => {
    return (
        <div className='card rounded bg-white border-white filter-card-container'>
            <ul className='ul-element'>
                {props.data.map(item => {
                    return (
                        <li className='li-element' key={item.key} onClick={() => { props.onChangeOfFilterDropDown(item.key) }}>{item.value}</li>
                    )
                })}
            </ul>
        </div>
    )
};

export default FilterDropDown;