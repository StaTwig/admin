import React from "react";
import { useState } from "react";

const CountryList = ({manufacturer, user}) => {
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
              {manufacturer?.warehouse?.countryName}
            </p>
            <p className="mi-body-xs grey f-500 mi-reset noselect">
              ( {manufacturer?.warehouse?.length} Organization )
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
            {manufacturer?.warehouse?.map((country, index) =>
              <li className="mi-flex organization-list-item">
                <span>
                  <i className="fa-solid fa-building mr-2"></i>
                </span>
                <div>{country?.name}</div>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default CountryList;
