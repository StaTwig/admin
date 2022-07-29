import React, { useState } from "react";
import "./Networking.scss";
import NetworkMap from "./networkMap/NetworkMap";
import Reports from "./reports/Reports";
import Checkbox from "@mui/material/Checkbox";
import NetworkDashboard from "./networkDashboard/NetworkDashboard";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Networking(props) {
  const {
    bestseller,
    inStock,
    manufacturer,
    reportWarehouse,
    oManufacturer,
    outStock,
    user,
    setReportWarehouse,
    MainTab, 
    setPartnerLocation,
    setMainTab
  } = props;

  const [MobileDashboard, setMobileDashboard] = useState(false);
  return (
    <div className='network-main-layout'>
      <div className='network-grid-container'>
        <div className={`network-dashboard ${MobileDashboard && "active"}`}>
          <NetworkDashboard
            reportWarehouse={reportWarehouse}
            {...props}
            manufacturer={manufacturer}
            setReportWarehouse={(param) => setReportWarehouse(param)}
            oManufacturer={oManufacturer}
            setMobileDashboard={setMobileDashboard}
          />
        </div>
        <div className='network-workspace'>
          <div className='network-map-holder'>
            <div className='map-filter-button'>
              <div className={`dashboard-mobile`}>
                <div
                  className='dashboard-mobile-btn'
                  onClick={() => setMobileDashboard(true)}
                >
                  <i class='fa-solid fa-map-location-dot'></i>
                </div>
              </div>
              {/* <div className="location-filter-btn filter-hide-sm">
                <Checkbox {...label} />
                <p className="mi-body-md f-500  mi-reset">My Location</p>
              </div>
              <div className="location-filter-btn filter-hide-sm">
                <Checkbox {...label} />
                <p className="mi-body-md f-500  mi-reset">Partner Location</p>
              </div> */}
            </div>
            <NetworkMap {...props} />
          </div>
          <div className='network-report-holders'>

            <Reports {...props} reportWarehouse={reportWarehouse} MainTab={MainTab} setMainTab={setMainTab}/>
          </div>
        </div>
      </div>
    </div>
  );
}
