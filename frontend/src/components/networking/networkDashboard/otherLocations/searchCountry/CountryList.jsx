import React from "react";
import { useState } from "react";

const CountryList = () => {
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <>
      <div className="mi-accordion-container">
        <div
          className="mi-flex-sb organization-list-dropdown"
          onClick={() => setToggleButton(!toggleButton)}
        >
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset noselect">
              United State
            </p>
            <p className="mi-body-xs grey f-500 mi-reset noselect">
              ( 4 Organization )
            </p>
          </div>
          {toggleButton ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i class="fa-solid fa-angle-down"></i>
          )}
        </div>
        {toggleButton && (
          <ul className="unordered-organization-list">
            <li className="mi-flex organization-list-item">
              <span>
                <i className="fa-solid fa-building mr-2"></i>
              </span>
              <div>ABC Organization</div>
            </li>
            <li className="mi-flex organization-list-item">
              <span>
                <i className="fa-solid fa-building mr-2"></i>
              </span>
              <div>ABC Organization</div>
            </li>
            <li className="mi-flex organization-list-item">
              <span>
                <i className="fa-solid fa-building mr-2"></i>
              </span>
              <div>ABC Organization</div>
            </li>
            <li className="mi-flex organization-list-item">
              <span>
                <i className="fa-solid fa-building mr-2"></i>
              </span>
              <div>ABC Organization</div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default CountryList;
