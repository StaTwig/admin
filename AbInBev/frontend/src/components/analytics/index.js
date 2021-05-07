import React, { useState } from "react";

import "./style.scss";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"
import ViewRenderer from "./viewRenderer";

const Analytics = (props) => {

  const [filters, setFilters] = useState({
    view: 'GEO_VIEW'
  });

  const [selectedViewCode, setSelectedViewCode] = useState('GEO_VIEW');

  const changeView = (event) => {
    setSelectedViewCode(event.target.value);
  }
  const onViewChange = (viewCode, props) => {
    setSelectedViewCode(viewCode);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <SideBar {...props} />
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
          <div className="row">
            <div className="col-md-9 mainContainer pt-3 px-4">
              <ViewRenderer viewName={selectedViewCode} onViewChange={onViewChange}></ViewRenderer>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader mb-3">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                    </div>
                <label className="radioButton" for="gv">
                  <input className="radioInput" type="radio" name="view" value="gv" id="gv" value="GEO_VIEW" onChange={changeView} defaultChecked={filters.view === 'GEO_VIEW'} /> Geographical View
                    </label>
                <label className="radioButton" for="sv">
                  <input className="radioInput" type="radio" name="view" value="sv" id="sv" value="SKU_VIEW" onChange={changeView} defaultChecked={filters.view === 'SKU_VIEW'} /> SKU View
                    </label>
                <label className="radioButton" for="suv">
                  <input className="radioInput" type="radio" name="view" value="suv" id="suv" value="SUPPLIER_VIEW" onChange={changeView} defaultChecked={filters.view === 'SUPPLIER_VIEW'} /> Supplier View
                    </label>
                <label className="radioButton" for="bv">
                  <input className="radioInput" type="radio" name="view" value="bv" id="bv" value="BREWERY_VIEW" onChange={changeView} defaultChecked={filters.view === 'BREWERY_VIEW'} /> Brewery View
                    </label>
                <label className="filterSubHeading mt-3">Select SPM</label>
                <select className="filterSelect mt-2">
                  <option>Select SPM</option>
                </select>
                <label className="filterSubHeading mt-3">Select State</label>
                <select className="filterSelect mt-2">
                  <option>Select State</option>
                  <option>Karnataka</option>
                  <option>Telangana</option>
                </select>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
