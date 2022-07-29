import React from "react";
import LocationCard from "./locationCard/LocationCard";

export default function ManufacturerHeader({ MylocationFilter, setMobileDashboard, setMylocationFilter, partnerLocation, oManufacturer, manufacturer, user, setPartnerLocation }) {
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
        <h1 className="mi-subtitle-xs  f-700  mi-reset">
          {user?.organisation?.split("/")[0]}
        </h1>
        <p className="mi-body-sm f-400 grey  mi-reset">{user?.location}</p>
      </div>
      <LocationCard MylocationFilter={MylocationFilter} setMylocationFilter={setMylocationFilter} partnerLocation={partnerLocation} oManufacturer={oManufacturer} manufacturer={manufacturer} setPartnerLocation={setPartnerLocation} />
    </div>
  );
}
