import React from "react";
import OrganizationList from "./OrganizationList";

const SearchOrganization = () => {
  return (
    <div className="search-location-results">
      <p className="mi-body-md f-400 grey mi-reset">Organization List</p>
      <div className="search-result-container">
        <OrganizationList />
        <OrganizationList />
        <OrganizationList />
      </div>
    </div>
  );
};

export default SearchOrganization;
