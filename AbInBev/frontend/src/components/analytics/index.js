import React, {useState} from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import BreweryView from "./breweryView";
import GeographicalView from "./geographicalView";
import "./style.scss";
import bottlesIcon from "../../assets/becks_330ml.png";
import DownArrow from "../../assets/down_arrow.png";
import UpArrow from "../../assets/up_arrow.png";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"

const Analytics = (props) => {
  const { analytics } = props;
  const [analyticType, setAnalyticType] = useState(1);
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 d-none d-md-block padding0 greyBG">
              <SideBar {...props} />
            </div>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
              <div className="row">

                <div className="col-md-9 mainContainer pt-3 px-4">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                    <h1 className="h2">Analytics</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                      </svg>
                    </div>
                  </div>
                  {analyticType == 1 && <GeographicalView analytics={analytics} />}
                  {analyticType == 4 && <BreweryView analytics={analytics} />}
                 </div>
                
                <div className="col-md-3 rightSideMenu pt-4 px-2">
                  <div className="filterSection">
                    <div className="filterHeader mb-3">
                      <img src={filterIcon} className="filterIcon"/> FILTERS
                    </div>
                    <label class="radioButton" for="gv">
                      <input onClick={() => setAnalyticType(1)} className="radioInput" type="radio" name="radio" value="gv" id="gv" defaultChecked={true}/> Geographical View
                    </label>
                    <label class="radioButton" for="sv">
                      <input onClick={() => setAnalyticType(2)} className="radioInput" type="radio" name="radio" value="sv" id="sv" /> SKU View
                    </label>
                    <label class="radioButton" for="suv">
                      <input onClick={() => setAnalyticType(3)} className="radioInput" type="radio" name="radio" value="suv" id="suv" /> Supplier View
                    </label>
                    <label class="radioButton" for="bv">
                      <input onClick={() => setAnalyticType(4)} className="radioInput" type="radio" name="radio" value="bv" id="bv" /> Brewery View
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