import React, { useState } from "react";
import ChainofCustody from "./chain-of-custody/ChainofCustody";
import CurrentLocation from "./current-location/CurrentLocation";
import Tab from "./tabs/Tab";
import TrackingMap from "./tracking-map/TrackingMap";
import "./Tracking.scss";

export default function Tracking() {
  const [LocationTab, setLocationTab] = useState("CHAIN");
  return (
    <div className="tracking-main-layout">
      <div className="track-grid-container">
        <div className="tracking-content-area">
          <div className="tracking-header">
            <h1
              style={{ paddingBottom: "10px" }}
              className="vl-heading-bdr black f-700 mi-reset"
            >
              Track & Trace
            </h1>
            <div className="tracking-search-bar">
              <div className="mi-flex-ac">
                <input
                  type="search"
                  placeholder="Search by Tracking ID"
                  className="track-search"
                />
                <i className="bx bx-search search-track-icon"></i>
              </div>
            </div>
          </div>
          <div className="tab-buttons">
            <Tab
              layout="button"
              LocationTab={LocationTab}
              setLocationTab={setLocationTab}
            />
          </div>
          {LocationTab === "CHAIN" && <ChainofCustody />}
          {LocationTab === "LOCATION" && <CurrentLocation />}
        </div>
        <div className="tracking-map-area">
          <TrackingMap />
        </div>
      </div>
    </div>
  );
}
