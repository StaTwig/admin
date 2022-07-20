import React from "react";
import OrganizationList from "./OrganizationList";

const SearchOrganization = ({nManufacturer, user}) => {
  return (
    <div className="search-location-results">
      <p className="mi-body-md f-400 grey mi-reset">Organization List</p>
      <div className="search-result-container">
        {nManufacturer?.map((manufacture, index) =>
          <OrganizationList manufacture={manufacture} user={user} />
        )}
      </div>
    </div>
  );
};

export default SearchOrganization;
