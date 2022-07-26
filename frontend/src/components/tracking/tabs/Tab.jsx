import React from "react";
import "./tab.scss";

export default function Tab({ layout, LocationTab, setLocationTab }) {
  return (
    <>
      {layout === "button" && (
        <div className="tab-group-ui-grid">
          <div
            className={`tab-button-grid tab-first-child  ${
              LocationTab === "CHAIN" && "active"
            }`}
            onClick={() => setLocationTab("CHAIN")}
          >
            <i class="fa-solid fa-link"></i>
            <p className="mi-body-sm f-500 mi-reset">Chain of custody</p>
          </div>
          <div
            className={`tab-button-grid tab-last-child tab-left-border ${
              LocationTab === "LOCATION" && "active"
            }`}
            onClick={() => setLocationTab("LOCATION")}
          >
            <i class="fa-solid fa-location-crosshairs"></i>
            <p className="mi-body-sm  f-500 mi-reset">Current Location</p>
          </div>
        </div>
      )}
    </>
  );
}
