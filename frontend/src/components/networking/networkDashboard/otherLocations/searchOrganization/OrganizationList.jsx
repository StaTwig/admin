import React, { useState } from "react";

const OrganizationList = () => {
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <div className="mi-accordion-container">
      <div
        className="mi-flex-sb organization-list-dropdown"
        onClick={() => setToggleButton(!toggleButton)}
      >
        <div className="mi-table-data">
          <p className="mi-body-md black f-700 mi-reset noselect">
            ABC Organization
          </p>
          <p className="mi-body-xs grey f-500 mi-reset noselect">
            ( 4 Location )
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
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 1 - Hyderabad</div>
          </li>
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 2 - Bhadradri Kothagudem</div>
          </li>
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 3 - Adilabad</div>
          </li>
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 4 - Mahabubabad</div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default OrganizationList;
