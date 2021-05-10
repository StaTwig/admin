import React, { useState } from "react";

import "./style.scss";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"
import ViewRenderer from "./viewRenderer";

const Analytics = (props) => {

  const [filters, setFilters] = useState({
    view: 'ANNUALREPORT_DASHBOARD'
  });

  const [selectedViewCode, setSelectedViewCode] = useState('ANNUALREPORT_DASHBOARD');
  const [annualReportButton, setannualReportButton] = useState("btn active");
  const [inventoryButton, setInventoryButton] = useState("btn");
  const [spm, setSpmButton] = useState("btn");
  function selectModule(module){
    if (module === "ANNUALREPORT_DASHBOARD") {
      setannualReportButton("btn active"); 
      setInventoryButton("btn");
      setSpmButton("btn");

    }
    if (module === "INVENTORY_DASHBOARD") {
      setannualReportButton("btn"); 
      setInventoryButton("btn active");
      setSpmButton("btn");
    }
    if (module === "SPM_DASHBOARD") {
      setannualReportButton("btn"); 
      setInventoryButton("btn");
      setSpmButton("btn active");
    }
  }
  const changeView = (event) => {
    setSelectedViewCode(event.target.value);
  }
  const onViewChange = (viewCode, props) => {
    setSelectedViewCode(viewCode);
  }

  const onModuleChange = (moduleCode, props) =>{
    setFilters(moduleCode);
    setSelectedViewCode(moduleCode);
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
                {/* TODO Tabs for for Module load  */}
                <div class="btn-group filterButton mt-2 mb-4">
                  <a href="#!" class={annualReportButton}
                  onClick={() => {
                    selectModule("ANNUALREPORT_DASHBOARD");
                    onModuleChange("ANNUALREPORT_DASHBOARD");
                  }}>
                    Annual Reports
                  </a>
                  <a href="#!" class={inventoryButton}
                  onClick={() => {
                    selectModule("INVENTORY_DASHBOARD");
                    onModuleChange("INVENTORY_DASHBOARD");
                  }}>
                    Inventory
                  </a>
                  <a href="#!" class={spm}
                  onClick={() => {
                    selectModule("SPM_DASHBOARD");
                    onModuleChange("SPM_DASHBOARD");
                  }}>
                    SPM
                  </a>
                </div>
                <label className="radioButton" for="gv">
                  <input className="radioInput" type="radio" name="view" value="gv" id="gv" value="ANNUALREPORT_DASHBOARD" onChange={changeView} defaultChecked={filters.view === 'ANNUALREPORT_DASHBOARD'} /> Geographical View
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
