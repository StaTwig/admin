import React, { useState, useEffect } from "react";
import { getManufacturerWarehouses } from "../../../../../actions/networkActions";
const OrganizationList = ({orgName, user, orgId, setReportWarehouse}) => {
  const [warehouses, setWarehouses] = useState([]);
  useEffect(()=>{
    (async() =>{
    const warehouses = await getManufacturerWarehouses(orgId, "");
    setWarehouses([...warehouses.data.warehouses]);
    })();
  }, [])
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <div className="mi-accordion-container">
      <div
        className="mi-flex-sb organization-list-dropdown"
        onClick={() => setToggleButton(!toggleButton)}
      >
        <div className="mi-table-data">
          <p className="mi-body-md black f-700 mi-reset noselect">
            {orgName}
          </p>
          <p className="mi-body-xs grey f-500 mi-reset noselect">
            ( {warehouses?.length} Location )
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
          {warehouses?.map((warehouse, index) => 
            <li className="mi-flex organization-list-item">
              <span>
                <i className="fa-solid fa-location-dot mr-2"></i>
              </span>
              <button className="link-button" onClick={() => setReportWarehouse(warehouse?.warehouseId)}>
              <div>Location {index+1} - {warehouse?.title} - {warehouse?.city}</div>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default OrganizationList;
