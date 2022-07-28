import React from "react";
import "./tab.scss";

export default function Tab({
  layout,
  MainTab,
  setMainTab,
  SubTab,
  setSubTab,
  LocationTab,
  setLocationTab,
  emptyRegex,
}) {
  return (
    <>
      {layout === "main" && (
        <div className="tab-group-ui">
          <div
            className={`tab-button tab-first-child  ${
              MainTab === "INSTOCK" && "active"
            }`}
            onClick={() => setMainTab("INSTOCK")}
          >
            <i class="fa-solid fa-box-archive mi-icon-xl"></i>
            <p className="mi-body-sm f-500 mi-reset">In - Stock</p>
          </div>
          <div
            className={`tab-button tab-left-border ${
              MainTab === "OUTSTOCK" && "active"
            }`}
            onClick={() => setMainTab("OUTSTOCK")}
          >
            <i class="fa-solid fa-box-archive"></i>
            <p className="mi-body-sm f-500 mi-reset">Out of Stock</p>
          </div>
          <div
            className={`tab-button tab-last-child tab-left-border ${
              MainTab === "BESTSELLER" && "active"
            }`}
            onClick={() => setMainTab("BESTSELLER")}
          >
            <i class="fa-solid fa-ranking-star"></i>
            <p className="mi-body-sm  f-500 mi-reset">Best Seller</p>
          </div>
        </div>
      )}

      {layout === "button" && (
        <div className="tab-group-ui-grid">
          <div
            className={`tab-button-grid tab-first-child  ${
              LocationTab === "ORGANIZATION" && "active"
            }`}
            onClick={() => {
              emptyRegex();
              setLocationTab("ORGANIZATION");
            }}
          >
            <i className="fa-solid fa-building "></i>
            <p className="mi-body-sm f-500 mi-reset">Organization</p>
          </div>
          <div
            className={`tab-button-grid tab-last-child tab-left-border ${
              LocationTab === "COUNTRY" && "active"
            }`}
            onClick={() => {
              emptyRegex();
              setLocationTab("COUNTRY");
            }}
          >
            <i className="fa-solid fa-earth-africa"></i>
            <p className="mi-body-sm  f-500 mi-reset">Countries</p>
          </div>
        </div>
      )}

      {/* {layout === "sub-tab" && (
        <div className="sub-tab-group-ui">
          <div className="sub-tab">
            <div
              className={`sub-tab-btn ${SubTab === "MY" && "active"} `}
              onClick={() => setSubTab("MY")}
            >
              <p className="mi-body-sm f-500 mi-reset">MY LOCATION</p>
            </div>
            <div
              className={`sub-tab-btn ${SubTab === "PARTNER" && "active"}`}
              onClick={() => setSubTab("PARTNER")}
            >
              <p className="mi-body-sm f-500 mi-reset">PARTNER LOCATION</p>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
