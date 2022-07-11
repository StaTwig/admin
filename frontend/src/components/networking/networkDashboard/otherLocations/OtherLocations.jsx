import React, { useState } from "react";
import Tab from "../../reports/tabs/Tab";
import "./OtherLocations.scss";
import SearchCountry from "./searchCountry/SearchCountry";
import SearchOrganization from "./searchOrganization/SearchOrganization";

const OtherLocations = () => {
  const [LocationTab, setLocationTab] = useState("ORGANIZATION");
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
      {LocationTab === "ORGANIZATION" && <SearchOrganization />}
      {LocationTab === "COUNTRY" && <SearchCountry />}
    </div>
  );
};

export default OtherLocations;
