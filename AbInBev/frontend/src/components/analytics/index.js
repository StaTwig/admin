import React, {useState, useEffect} from "react";
import "./style.scss";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"
import Becks from "../../assets/bottles/Becks.png";
import Fosters from "../../assets/bottles/Fosters.png";
import Budweiser from "../../assets/bottles/Budweiser.png";
import BudweiserMagnum from "../../assets/bottles/BudweiserMagnum.png";
import Haywards5000 from "../../assets/bottles/Haywards5000.png";
import KO from "../../assets/bottles/KnockOut.png";
import RoyalChallenger from "../../assets/bottles/RoyalChallenger.png";
import BBecks from "../../assets/brands/Becks.png";
import BFosters from "../../assets/brands/Fosters.png";
import BBudweiser from "../../assets/brands/Budweiser.png";
import BBudweiserMagnum from "../../assets/brands/BudweiserMagnum.png";
import BHaywards5000 from "../../assets/brands/Haywards5000.png";
import BKO from "../../assets/brands/KnockOut.png";
import BRoyalChallenger from "../../assets/brands/RoyalChallenger.png";
import ViewRenderer from "./viewRenderer";

const Analytics = (props) => {

  const brands = ['Becks', 'Fosters', 'Budweiser', 'BudweiserMagnum', 'Haywards5000', 'RoyalChallenger', 'KO'];
  const brandsArr = [Becks, Fosters, Budweiser, BudweiserMagnum, Haywards5000, RoyalChallenger, KO];
  const brandsIconArr = [BBecks, BFosters, BBudweiser, BBudweiserMagnum, BHaywards5000, BRoyalChallenger, BKO];
  const [filters, setFilters] = useState({
    view: 'ANNUALREPORT_DASHBOARD'
  });
  const [districts, setDistricts] = useState([]);
  const [prop, setProp] = useState({});
  let skuArr = [];
  const [params, setParams] = useState({});
  const [SKU, setSKU] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [qtr, setQtr] = useState('');
  const [isActive, setIsActive] = useState('');
  const [Otype, setOtype] = useState('All');
  const [selectedViewCode, setSelectedViewCode] = useState('ANNUALREPORT_DASHBOARD');
  const [annualReportButton, setannualReportButton] = useState("btn active");
  const [inventoryButton, setInventoryButton] = useState("btn");
  const [spm, setSpmButton] = useState("btn");

  useEffect(() => {
    setSKU(props?.sku ? props.sku : prop?.externalId ? prop.externalId : '');
  }, [props, prop])

  const allowedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let thisYear = new Date().getFullYear();
  const allowedYears = [];
  for (let i = 0; i < 21; i++) {
    allowedYears.push(thisYear - i);
  }

  const onYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    const filter = { ...params };
    filter.year = selectedYear;
    setParams(filter);
  };

  const onMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    const filter = { ...params };
    filter.month = selectedMonth;
    setParams(filter);
    
  };

  const onQuarterChange = (event) => {
    const selectedQuarter = event.target.value;
    setQtr(selectedQuarter);
    const filter = { ...params };
    filter.quarter = selectedQuarter;
    setParams(filter);
  };

  const onStateChange = async(event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    const filter = { ...params };
    filter.state = selectedState;
    const result = await props.getDistricts(selectedState);
    setDistricts(result.data);
    setParams(filter);
  };

  const onDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    const filter = { ...params };
    filter.district = selectedDistrict;
    setParams(filter);
  };

  const onTPChange = (value) => {
    const filter = { ...params };
    filter.date_filter_type = value;
    setIsActive(value);
    setParams(filter);
  };

  function selectModule(module){
    setSKU('');
    setProp({});
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
    setProp({});
    setState('');
    setParams({});
    setDistrict('');
    setSelectedViewCode(event.target.value);
  }
  const onViewChange = (viewCode, props) => {
    setSKU('');
    setProp({});
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

  const resetFilters = () => {
    setSKU('');
    setProp({});
    setState('');
    setDistrict('');
    setIsActive('');
    setYear('');
    setMonth('');
    setQtr('');
    setOtype('All');
    setParams({});
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
              <ViewRenderer {...props} brandsArr={brandsArr} brands={brands} brandsIconArr={brandsIconArr} prop={prop} params={params} Otype={Otype} sku={SKU} viewName={selectedViewCode} onViewChange={onViewChange}></ViewRenderer>
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
                    setSelectedViewCode("ANNUALREPORT_DASHBOARD");
                    selectModule("ANNUALREPORT_DASHBOARD");
                    onModuleChange("ANNUALREPORT_DASHBOARD");
                  }}>
                    Annual Reports
                  </a>
                  <a href="#!" className={inventoryButton}
                  onClick={() => {
                    setSelectedViewCode("INVENTORY_DASHBOARD");
                    selectModule("INVENTORY_DASHBOARD");
                    onModuleChange("INVENTORY_DASHBOARD");
                  }}>
                    Inventory
                  </a>
                  <a href="#!" className={spm}
                  onClick={() => {
                    setSelectedViewCode("SPM_DASHBOARD");
                    selectModule("SPM_DASHBOARD");
                    onModuleChange("SPM_DASHBOARD");
                  }}>
                    SPM
                  </a>
                </div>
                {selectedViewCode !== 'SPM_DASHBOARD' &&
                  <>
                  <label className="radioButton" for="gv">
                    <input className="radioInput" type="radio" name="view" id="gv" value={selectedViewCode === 'INVENTORY_DASHBOARD' || selectedViewCode === 'INVENTORY_SKU' || filters.view === 'INVENTORY_SKU_DETAILS' ? "INVENTORY_DASHBOARD" : 'ANNUALREPORT_DASHBOARD'} onChange={changeView} defaultChecked={filters.view === 'ANNUALREPORT_DASHBOARD' || filters.view === 'INVENTORY_DASHBOARD'} /> Geographical View
                    </label>
                  <label className="radioButton" for="sv">
                    <input className="radioInput" type="radio" name="view" id="sv" value={(selectedViewCode === 'INVENTORY_DASHBOARD' || selectedViewCode === 'INVENTORY_GRAPHICAL') ? "INVENTORY_SKU" : 'SKU_VIEW'} onChange={changeView} defaultChecked={filters.view === 'SKU_VIEW' || filters.view === 'INVENTORY_SKU' || filters.view === 'INVENTORY_SKU_DETAILS'} /> SKU View
                    </label>
                    </>
                }
                {selectedViewCode !== 'SPM_DASHBOARD' && selectedViewCode !== 'INVENTORY_DASHBOARD' && selectedViewCode !== 'INVENTORY_SKU' && selectedViewCode !== 'INVENTORY_GRAPHICAL' && selectedViewCode !== 'INVENTORY_SKU_DETAILS' && 
                  <>
                <label className="radioButton" for="suv">
                  <input className="radioInput" type="radio" name="view"  id="suv" value="SUPPLIER_VIEW" onChange={changeView} defaultChecked={filters.view === 'SUPPLIER_VIEW'} /> Supplier View
                    </label>
                <label className="radioButton" for="bv">
                  <input className="radioInput" type="radio" name="view" id="bv" value="BREWERY_VIEW" onChange={changeView} defaultChecked={filters.view === 'BREWERY_VIEW'} /> Brewery View
                    </label>
                  </>
                }
                {selectedViewCode !== 'SPM_DASHBOARD' && selectedViewCode != 'BREWERY_VIEW' && 
                <>
                <label className="filterSubHeading mt-3">Select SKU</label>
                <select className="filterSelect mt-2" value={SKU} onChange={skuChanged}>
                  <option value="">Select SKU</option>
                  {props.SKUs?.map((sku) => {
                    let enable = true;
                    if (!skuArr.includes(sku.id)) 
                      skuArr.push(sku.id);
                    else 
                      enable = false;
                    
                    return ( enable ? 
                      <option value={sku.id}>{sku.name}</option> : ''
                    )
                  }
                  )
                  }
                  </select>
                  {(selectedViewCode == 'ANNUALREPORT_DASHBOARD' || selectedViewCode == 'DETAILED_GEO_VIEW' || selectedViewCode == 'SKU_DETAIL_VIEW') &&
                    <>
                      <label className="filterSubHeading mt-3">Select State</label>
                      <select className="filterSelect mt-2" value={state} onChange={onStateChange}>
                        <option value="">Select State</option>
                        {props.states?.map((state) =>
                          <option value={state}>{state}</option>
                        )
                        }
                      </select>
                      <label className="filterSubHeading mt-3">Select District</label>
                      <select value={district} className="filterSelect mt-2" onChange={onDistrictChange}>
                        <option value="">Select District</option>
                        {districts?.map((district) =>
                          <option value={district}>{district}</option>
                        )
                        }
                      </select>
                    </>
                  }
                </>
                }
                {(selectedViewCode == 'DETAILED_GEO_VIEW' || selectedViewCode == 'ANNUALREPORT_DASHBOARD') &&
                  <>
                  <label className="filterSubHeading mt-3">Time Period</label>
                  <div class="btn-group filterButton mt-2 mb-4">
                    <a href="#!" class={`btn ${isActive == 'by_monthly' ? `active` : ``}`}
                      onClick={() => { onTPChange('by_monthly'); }}
                    >
                      Monthly
                  </a>
                    <a href="#!" class={`btn ${isActive == 'by_quarterly' ? `active` : ``}`}
                      onClick={() => {onTPChange('by_quarterly'); }}
                    >
                      Quarterly
                  </a>
                    <a href="#!" class={`btn ${isActive == 'by_yearly' ? `active` : ``}`}
                      onClick={() => {onTPChange('by_yearly');}}
                    >
                      Yearly
                  </a>
                  </div>
                  </>
                }
                {(selectedViewCode == 'DETAILED_GEO_VIEW' || selectedViewCode == 'ANNUALREPORT_DASHBOARD') && (isActive == 'by_monthly' || isActive == 'by_yearly' || isActive == 'by_quarterly') &&
                  <div className="row">
                    <div className="col-md-5">
                      <select
                        className="filterSelect mt-2"
                        value={year}
                        onChange={onYearChange}
                      >
                        <option value="">Select Year</option>
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
                          value={month}
                          onChange={onMonthChange}
                        >
                          <option value="">Select Month</option>
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
                    {(selectedViewCode == 'DETAILED_GEO_VIEW' || selectedViewCode == 'ANNUALREPORT_DASHBOARD') && isActive == 'by_quarterly' &&
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          value={qtr}
                          onChange={onQuarterChange}
                        >
                          <option value="">Select Quarter</option>
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
                {(selectedViewCode == 'SUPPLIER_DETAIL_VIEW') && 
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
                {!!Object.keys(params).length &&
                  <button
                    className="btn SearchButton mt-4"
                    onClick={resetFilters}
                  >
                    Clear
                </button>
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
