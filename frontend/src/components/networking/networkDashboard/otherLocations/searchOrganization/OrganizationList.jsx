import React, { useState } from "react";

const OrganizationList = ({manufacture, user}) => {
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <div className="mi-accordion-container">
      <div
        className="mi-flex-sb organization-list-dropdown"
        onClick={() => setToggleButton(!toggleButton)}
      >
        <div className="mi-table-data">
          <p className="mi-body-md black f-700 mi-reset noselect">
            {user?.organisation?.split('/')[0]}
          </p>
          <p className="mi-body-xs grey f-500 mi-reset noselect">
            ( {manufacture?.warehouse?.length} Location )
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
          {manufacture?.warehouse?.map((warehouse, index) => 
            <li className="mi-flex organization-list-item">
              <span>
                <i className="fa-solid fa-location-dot mr-2"></i>
              </span>
              <div>Location {index+1} - {warehouse?.name}</div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default OrganizationList;
