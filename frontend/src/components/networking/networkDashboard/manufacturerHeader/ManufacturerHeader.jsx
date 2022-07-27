import React from "react";
import LocationCard from "./locationCard/LocationCard";

export default function ManufacturerHeader({ setMobileDashboard, oManufacturer, manufacturer, user }) {
  return (
    <div className="manufacturer-header">
      <div className="location-close">
        <div
          className="modal-closing-space"
          onClick={() => setMobileDashboard(false)}
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="organization-header">
        <h1 className="mi-subtitle-sm  f-700  mi-reset">{user?.organisation?.split('/')[0]}</h1>
        <p className="mi-body-md f-400 grey  mi-reset">{user?.location}</p>
      </div>
      <LocationCard oManufacturer={oManufacturer} manufacturer={manufacturer} />
    </div>
  );
}
