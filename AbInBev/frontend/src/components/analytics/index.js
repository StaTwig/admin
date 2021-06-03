import React, {useState} from "react";
import "./style.scss";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"
import ViewRenderer from "./viewRenderer";

const Analytics = (props) => {

  const [filters, setFilters] = useState({
    view: 'ANNUALREPORT_DASHBOARD'
  });


  const allowedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let thisYear = new Date().getFullYear();
  const allowedYears = [];
  for (let i = 0; i < 21; i++) {
    allowedYears.push(thisYear - i);
  }

  const onYearChange = (event) => {
    const selectedYear = event.target.value;
    const filter = { ...params };
    filter.year = selectedYear;
    setParams(filter);
  };

  const onMonthChange = (event) => {
    const selectedMonth = event.target.value;
    const filter = { ...params };
    filter.month = selectedMonth;
    setParams(filter);
    
  };

  const onQuarterChange = (event) => {
    const selectedQuarter = event.target.value;
    const filter = { ...params };
    filter.quarter = selectedQuarter;
    setParams(filter);
  };

  const onStateChange = (event) => {
    const selectedState = event.target.value;
    const filter = { ...params };
    filter.state = selectedState;
    setParams(filter);
  };

  const [prop, setProp] = useState({});
  let skuArr = [];
  const [params, setParams] = useState({});
  const [SKU, setSKU] = useState('');
  const [isActive, setTsActive] = useState('');
  const [Otype, setOtype] = useState('All');
  const [selectedViewCode, setSelectedViewCode] = useState('ANNUALREPORT_DASHBOARD');
  const [annualReportButton, setannualReportButton] = useState("btn active");
  const [inventoryButton, setInventoryButton] = useState("btn");
  const [spm, setSpmButton] = useState("btn");
  function selectModule(module){
    setSKU('');
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
    setSKU('');
    setSelectedViewCode(event.target.value);
  }
  const onViewChange = (viewCode, props) => {
    setProp(props);
    setSelectedViewCode(viewCode);
  }

  const onModuleChange = (moduleCode, props) =>{
    setFilters(moduleCode);
    setSelectedViewCode(moduleCode);
  }

  const skuChanged = (event) => {
    setSKU(event.target.value);
  }

  const changeOType = (value) => {
    setOtype(value);
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
              <ViewRenderer {...props} prop={prop} params={params} Otype={Otype} sku={SKU} viewName={selectedViewCode} onViewChange={onViewChange}></ViewRenderer>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader mb-3">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>
                {/* TODO Tabs for for Module load  */}
                <div className="btn-group filterButton mt-2 mb-4">
                  <a href="#!" className={annualReportButton}
                  onClick={() => {
                    selectModule("ANNUALREPORT_DASHBOARD");
                    onModuleChange("ANNUALREPORT_DASHBOARD");
                  }}>
                    Annual Reports
                  </a>
                  <a href="#!" className={inventoryButton}
                  onClick={() => {
                    selectModule("INVENTORY_DASHBOARD");
                    onModuleChange("INVENTORY_DASHBOARD");
                  }}>
                    Inventory
                  </a>
                  <a href="#!" className={spm}
                  onClick={() => {
                    selectModule("SPM_DASHBOARD");
                    onModuleChange("SPM_DASHBOARD");
                  }}>
                    SPM
                  </a>
                </div>
                <label className="radioButton" for="gv">
                  <input className="radioInput" type="radio" name="view" value="gv" id="gv" value={selectedViewCode === 'INVENTORY_DASHBOARD' ? "INVENTORY_DASHBOARD" : 'ANNUALREPORT_DASHBOARD'} onChange={changeView} defaultChecked={filters.view === 'ANNUALREPORT_DASHBOARD'} /> Geographical View
                    </label>
                <label className="radioButton" for="sv">
                  <input className="radioInput" type="radio" name="view" value="sv" id="sv" value={selectedViewCode === 'INVENTORY_DASHBOARD' ? "INVENTORY_SKU" : 'SKU_VIEW'} onChange={changeView} defaultChecked={filters.view === 'SKU_VIEW' || filters.view === 'INVENTORY_SKU'} /> SKU View
                    </label>
                {selectedViewCode !== 'INVENTORY_DASHBOARD' && selectedViewCode !== 'INVENTORY_SKU' && 
                  <>
                <label className="radioButton" for="suv">
                  <input className="radioInput" type="radio" name="view" value="suv" id="suv" value="SUPPLIER_VIEW" onChange={changeView} defaultChecked={filters.view === 'SUPPLIER_VIEW'} /> Supplier View
                    </label>
                <label className="radioButton" for="bv">
                  <input className="radioInput" type="radio" name="view" value="bv" id="bv" value="BREWERY_VIEW" onChange={changeView} defaultChecked={filters.view === 'BREWERY_VIEW'} /> Brewery View
                    </label>
                  </>
                }
                {selectedViewCode != 'BREWERY_VIEW' && 
                <>
                <label className="filterSubHeading mt-3">Select SKU</label>
                <select className="filterSelect mt-2" value={SKU} onChange={skuChanged}>
                  <option>Select SKU</option>
                  {props.SKUs?.map((sku) => {
                    let enable = true;
                    if (!skuArr.includes(sku.externalId)) 
                      skuArr.push(sku.externalId);
                    else 
                      enable = false;
                    
                    return ( enable ? 
                      <option value={sku.externalId}>{sku.name}</option> : ''
                    )
                  }
                  )
                  }
                </select>
                <label className="filterSubHeading mt-3">Select State</label>
                <select className="filterSelect mt-2" onChange={onStateChange}>
                  <option>Select State</option>
                  {props.states?.map((state) => 
                      <option value={state}>{state}</option>
                    )
                  }
                </select>
                </>
                }
                {selectedViewCode == 'DETAILED_GEO_VIEW' &&
                  <>
                  <label className="filterSubHeading mt-3">Time Period</label>
                  <div class="btn-group filterButton mt-2 mb-4">
                    <a href="#!" class={`btn ${isActive == 'by_monthly' ? `active` : ``}`}
                      onClick={() => { setTsActive('by_monthly'); setParams({});}}
                    >
                      Monthly
                  </a>
                    <a href="#!" class={`btn ${isActive == 'by_quarterly' ? `active` : ``}`}
                      onClick={() => {setTsActive('by_quarterly'); setParams({});}}
                    >
                      Quarterly
                  </a>
                    <a href="#!" class={`btn ${isActive == 'by_yearly' ? `active` : ``}`}
                      onClick={() => {setTsActive('by_yearly'); setParams({});}}
                    >
                      Yearly
                  </a>
                  </div>
                  </>
                }
                {(isActive == 'by_monthly' || isActive == 'by_yearly' || isActive == 'by_quarterly') &&
                  <div className="row">
                    <div className="col-md-5">
                      <select
                        className="filterSelect mt-2"
                        onChange={onYearChange}
                      >
                        <option>Select Year</option>
                        {allowedYears.map((year, index) => {
                          return (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {isActive == 'by_monthly' &&
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          onChange={onMonthChange}
                        >
                          <option>Select Month</option>
                          {allowedMonths.map((month, index) => {
                            return (
                              <option key={index} value={index + 1}>
                                {month}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      }
                    {isActive == 'by_quarterly' &&
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          onChange={onQuarterChange}
                        >
                          <option>Select Quarter</option>
                          {['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec'].map((qtr, index) => {
                            return (
                              <option key={index} value={index + 1}>
                                {qtr}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      }
                  </div>
                }
                {selectedViewCode == 'BREWERY_DETAIL_VIEW' || selectedViewCode == 'SUPPLIER_DETAIL_VIEW' && 
                  <>
                  <h3 className="filterSubHeading mt-3">Vendor</h3>
                  <div className="btn-group filterButton mt-2 mb-4">
                    {['All', 'S1', 'S2', 'S3'].map((otype, index) => 
                      <span key={index} className={`btn p-2 ${Otype == otype ? `active` : `` }`} for={otype} onClick={() => changeOType(otype)}>
                        {otype}
                      </span>
                    )}
                  </div>
                  </>
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
