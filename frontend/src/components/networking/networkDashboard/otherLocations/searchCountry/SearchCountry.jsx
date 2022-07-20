import React from "react";
import CountryList from "./CountryList";

const SearchCountry = ({nManufacturer, user}) => {
  return (
    <div className="search-location-results">
      <p className="mi-body-md f-400 grey mi-reset">Country List</p>
      <div className="search-result-container">
        {nManufacturer?.map((manufacture, index) =>
          <CountryList manufacture={manufacture} user={user}/>
        )}
      </div>
    </div>
  );
};

export default SearchCountry;
