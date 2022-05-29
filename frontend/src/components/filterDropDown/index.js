import React from 'react';
import './style.scss';
import useOnclickOutside from "react-cool-onclickoutside";


const FilterDropDown = (props) => {

    const ref = useOnclickOutside(() => {
        setShowFilterDropDown(false);
      })

    const {
        showFilterDropDown,
        setShowFilterDropDown } = props

    return (
        <div ref={ref} className='card rounded bg-white border-white filter-card-container'>
            <ul className='ul-element'>
                {props.data.map((item, index) => {
                    return (
                        <li 
                            className={item.checked ? "li-element-selected" : 'li-element'}
                            key={item.key} 
                            onClick={() => 
                                { props.onChangeOfFilterDropDown(index, props.type, item.value) }}
                        >
                            {item.value}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default FilterDropDown;