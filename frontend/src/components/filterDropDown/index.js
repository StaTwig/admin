import React from "react";
import "./style.scss";

const FilterDropDown = (props) => {
  return (
    <div
      className={`card rounded bg-white border-white 
        ${
          props.type === "export"
            ? "filter-card-export-container"
            : "filter-card-container"
        }`}
    >
      <ul className='ul-element'>
        {props.data.map((item, index) => {
          return (
            <li
              className={item.checked ? "li-element-selected" : "li-element"}
              key={item.key}
              onClick={() => {
                console.log(item)
                props.onChangeOfFilterDropDown(index, props.type, item.value);
              }}
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterDropDown;
