import React, { useState } from "react";
import Tab from "../../reports/tabs/Tab";
import "./OtherLocations.scss";
import SearchCountry from "./searchCountry/SearchCountry";
import SearchOrganization from "./searchOrganization/SearchOrganization";
import { getManufacturerFilterOptions } from "../../../../actions/networkActions";


const OtherLocations = ({oManufacturer, user}) => {
  const [LocationTab, setLocationTab] = useState("ORGANIZATION");
  const [nManufacturer, setNManufacturer] = useState(oManufacturer);
  const toggleOrgCountry = async(param) => {
    const filterWarehouse = await getManufacturerFilterOptions(param);
    setNManufacturer(filterWarehouse.data);
  }
  return (
    <div className="other-locations-container">
      <div className="other-location-header">
        <h1 className="mi-body-lg dark f-600  mi-reset">Other Locations</h1>
        <p className="mi-body-md f-400 grey  mi-reset">
          Search by Organizations or Countries
        </p>
      </div>
      <div className="tab-area">
        <Tab
          layout="button"
          LocationTab={LocationTab}
          setLocationTab={setLocationTab}
          toggleOrgCountry={toggleOrgCountry}
        />
      </div>
      <div className="location-search-bar">
        <div className="mi-flex-ac">
          <input
            type="search"
            placeholder="Search by Organization"
            className="searchOrganization"
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>
      {LocationTab === "ORGANIZATION" && <SearchOrganization nManufacturer={nManufacturer} user={user} />}
      {LocationTab === "COUNTRY" && <SearchCountry nManufacturer={nManufacturer} user={user} />}
    </div>
  );
};

export default OtherLocations;
