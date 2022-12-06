import React from "react";
import "./LocationCard.scss";

export default function LocationCard({
  oManufacturer,
  manufacturer,
  setPartnerLocation,
  partnerLocation,
  MylocationFilter,
  setMylocationFilter,
  t,
}) {
  // const [PartnerlocationFilter, setPartnerlocationFilter] = useState(false);
  return (
    <div className='location-card-container'>
      <div
        className={`location-card my-card ${MylocationFilter && "active"}`}
        onClick={() => {
          setPartnerLocation(false);
          setMylocationFilter(!MylocationFilter);
        }}
      >
        <div className='location-card-top'>
          <div className='location-icon-space'>
            <i className='fa-solid fa-location-crosshairs'></i>
          </div>
          <p className='mi-body-xl f-700 mi-reset'>{t("my")}</p>
          <p className='mi-body-sm mi-reset'>{t("location")}</p>
        </div>
        <div className='location-card-bottom'>
          <h1 className='mi-title-sm f-700 mi-reset'>
            {manufacturer?.myLocations ? manufacturer?.myLocations : 0}
          </h1>
          {/* <p className="mi-body-sm f-500 mi-reset">ABC Manufacturer</p> */}
        </div>
        {MylocationFilter && (
          <div className='check-box-icon'>
            <i className='fa-solid fa-circle-check'></i>
          </div>
        )}
      </div>
      <div
        className={`location-card partner-card ${partnerLocation && "active"}`}
        onClick={() => {
          setMylocationFilter(false);
          setPartnerLocation(!partnerLocation);
        }}
      >
        <div className='location-card-top'>
          <div className='location-icon-space'>
            <i className='fa-solid fa-map-location-dot'></i>
          </div>
          <p className='mi-body-xl f-700 mi-reset'>{t("partner")}</p>
          <p className='mi-body-sm  mi-reset'>{t("location")}</p>
        </div>
        <div className='location-card-bottom'>
          <h1 className='mi-title-sm f-700 mi-reset'>
            {manufacturer?.partnerLocations
              ? manufacturer?.partnerLocations
              : 0}
          </h1>
        </div>
        {partnerLocation && (
          <div className='check-box-icon'>
            <i className='fa-solid fa-circle-check'></i>
          </div>
        )}
      </div>
    </div>
  );
}
