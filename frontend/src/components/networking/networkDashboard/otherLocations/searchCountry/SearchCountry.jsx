import React from "react";
import CountryList from "./CountryList";

const SearchCountry = () => {
  return (
    <div className="search-location-results">
      <p className="mi-body-md f-400 grey mi-reset">Country List</p>
      <div className="search-result-container">
        <CountryList />
        <CountryList />
        <CountryList />
      </div>
    </div>
  );
};

export default SearchCountry;
