import React, { useState } from "react";
import ChainofCustody from "./chain-of-custody/ChainofCustody";
import CurrentLocation from "./current-location/CurrentLocation";
import Tab from "./tabs/Tab";
import TrackingMap from "./tracking-map/TrackingMap";
import TrackIllustration from "../../assets/images/track.webp";
import "./Tracking.scss";

export default function Tracking() {
  const [LocationTab, setLocationTab] = useState("CHAIN");

  const [isTracking, setIsTracking] = useState(false);

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
                <i
                  className="bx bx-search search-track-icon"
                  onClick={() => setIsTracking(!isTracking)}
                ></i>
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
          {isTracking ? (
            <>
              {LocationTab === "CHAIN" && <ChainofCustody />}
              {LocationTab === "LOCATION" && <CurrentLocation />}
            </>
          ) : (
            <>
              <div className="tracking-home-layout">
                <div className="tracking-illustation">
                  <img
                    src={TrackIllustration}
                    alt="Track"
                    className="Track-Image"
                  />
                  <p className="mi-body-md f-500">
                    Search and Track your Product around the World!
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="tracking-map-area">
          <TrackingMap isTracking={isTracking} />
        </div>
      </div>
    </div>
  );
}
