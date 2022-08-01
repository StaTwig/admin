import React, { useState, useEffect } from "react";
import Tab from "../../reports/tabs/Tab";
import "./OtherLocations.scss";
import SearchCountry from "./searchCountry/SearchCountry";
import SearchOrganization from "./searchOrganization/SearchOrganization";
import { getManufacturerFilterOptions } from "../../../../actions/networkActions";

const OtherLocations = ({ user, setReportWarehouse }) => {
  const [LocationTab, setLocationTab] = useState("ORGANIZATION");
  const [LocationTab1, setLocationTab1] = useState("ORGANIZATION");
  const [nManufacturer, setNManufacturer] = useState([]);
  const [regExp, setRegExp] = useState("");

  useEffect(() => {
    const toggleOrgCountry = async (param) => {
      const filterWarehouse = await getManufacturerFilterOptions(param, regExp);
      setNManufacturer(
        filterWarehouse.data.length ? filterWarehouse.data[0].filters : []
      );
      setLocationTab1(LocationTab);
    };
    toggleOrgCountry(LocationTab === "ORGANIZATION" ? "org" : "country");
  }, [LocationTab, regExp]);
  return (
    <div className="other-locations-container">
      <div className="other-location-header">
        <h1 className="mi-body-sl dark f-600  mi-reset">Other Locations</h1>
        <p className="mi-body-sm f-400 grey  mi-reset">
          Search by Organizations or Countries
        </p>
      </div>
      <div className="tab-area">
        <Tab
          layout="button"
          LocationTab={LocationTab}
          setLocationTab={setLocationTab}
          emptyRegex={() => setRegExp("")}
        />
      </div>
      <div className="location-search-bar">
        <div className="mi-flex-ac">
          <input
            type="search"
            value={regExp}
            placeholder="Search by Organization"
            className="searchOrganization"
            onChange={(e) => setRegExp(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>
      {LocationTab1 === "COUNTRY" ? (
        <SearchCountry
          setReportWarehouse={(param) => setReportWarehouse(param)}
          nManufacturer={nManufacturer}
          user={user}
        />
      ) : (
        <SearchOrganization
          setReportWarehouse={(param) => setReportWarehouse(param)}
          nManufacturer={nManufacturer}
          user={user}
        />
      )}
    </div>
  );
};

export default OtherLocations;
