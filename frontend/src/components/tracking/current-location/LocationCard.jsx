import React from "react";
import ProductCard from "./ProductCard";

const TrackLocationCard = () => {
  return (
    <>
      <div className="current-location-container">
        <div className="current-location-header mi-flex-sb gap-2">
          <div className="header-content-space mi-flex-ac gap-2">
            <div className="current-location-icon-ctn">
              <i className="fa-solid fa-location-dot current-location-icon"></i>
            </div>
            <div className="header-text-space">
              <p className="mi-body-md f-500 mi-reset current-loc-org-name">
                ABC Organization Pvt, Ltd
              </p>
              <p className="mi-body-sm mi-reset current-loc-address">
                IT Hub, VP road Pune Maharashtra 400096 India
              </p>
            </div>
          </div>
          <div className="header-date-space">
            <p className="mi-body-sm mi-reset f-700 black">12/05/2022</p>
          </div>
        </div>
        <div className="current-location-body">
          <p className="mi-body-md f-700 mi-reset black">Product List</p>
          <div className="product-list-area">
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackLocationCard;
