import React from "react";
import CountryList from "./CountryList";

const SearchCountry = ({nManufacturer, user, setReportWarehouse, t}) => {
  return (
    <div className="search-location-results">
      <p className="mi-body-md f-400 grey mi-reset">{t("country_list")}</p>
      <div className="search-result-container">
      {nManufacturer.filter((c) => c.country).map((country, index) =>
         { return <CountryList setReportWarehouse={setReportWarehouse} country={country.country } user={user} />}
        )}
      </div>
    </div>
  );
};

export default SearchCountry;
