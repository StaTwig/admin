import React, {useEffect, useState} from "react";
import { getManufacturerFilterOptions } from "../../../../../actions/networkActions";
import OrganizationList from "./OrganizationList";
const SearchOrganization = ({ user, nManufacturer, setReportWarehouse}) => {
  // const [nManufacturer, setNManufacturer] = useState([{filters: []}]);
  // useEffect(() =>{
  //  const getManFilters = async(param) => {
  //   const filterWarehouse = await getManufacturerFilterOptions(param);
  //   setNManufacturer(filterWarehouse.data);
  //   console.log(filterWarehouse.data)
  // }
  // getManFilters("org");
  // }, [])
  return (
    <div className="search-location-results">
      <p className="mi-body-md f-400 grey mi-reset">Organization List</p>
      <div className="search-result-container">
        {nManufacturer.map((org, index) =>
         { return <OrganizationList setReportWarehouse={setReportWarehouse} orgName={org?.orgName?.length ? org?.orgName[0] : '' } orgId={org?.orgId} user={user} />}
        )}
      </div>
    </div>
  );
};

export default SearchOrganization;
