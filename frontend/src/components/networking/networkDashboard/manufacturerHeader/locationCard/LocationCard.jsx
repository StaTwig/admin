import React, { useState } from "react";
import "./LocationCard.scss";

export default function LocationCard({oManufacturer, manufacturer, setPartnerLocation, partnerLocation, MylocationFilter, setMylocationFilter}) {
  
  // const [PartnerlocationFilter, setPartnerlocationFilter] = useState(false);
  return (
    <div className="location-card-container">
      <div
        className={`location-card my-card ${MylocationFilter && "active"}`}
        onClick={() => {
          setMylocationFilter(!MylocationFilter);
        }}
      >
        <div className="location-card-top">
          <div className="location-icon-space">
            <i className="fa-solid fa-location-crosshairs"></i>
          </div>
          <p className="mi-body-xl f-700 mi-reset">My</p>
          <p className="mi-body-sm mi-reset">Location</p>
        </div>
        <div className="location-card-bottom">
          <h1 className="mi-title-sm f-700 mi-reset">{manufacturer?.myLocations}</h1>
          {/* <p className="mi-body-sm f-500 mi-reset">ABC Manufacturer</p> */}
        </div>
      </div>
      <div
        className={`location-card partner-card ${
          partnerLocation && "active"
        }`}
        onClick={() => {
          setPartnerLocation(!partnerLocation);
        }}
      >
        <div className="location-card-top">
          <div className="location-icon-space">
            <i class="fa-solid fa-map-location-dot"></i>
          </div>
          <p className="mi-body-xl f-700 mi-reset">Partner</p>
          <p className="mi-body-sm  mi-reset">Location</p>
        </div>
        <div className="location-card-bottom">
          <h1 className="mi-title-sm f-700 mi-reset">{manufacturer?.partnerLocations}</h1>
        </div>
      </div>
    </div>
  );
}
