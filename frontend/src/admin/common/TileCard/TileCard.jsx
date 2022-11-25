import React from "react";
import { useSelector } from "react-redux";
import "./TileCard.css";

export default function TileCard({ layout, t }) {
  const { addresses } = useSelector((state) => state.organisationReducer);
  const total = addresses.length;
  const active = addresses.filter((item) => item.status === "ACTIVE").length;
  const inactive = total - active;
  return (
    <>
      {layout === "location" && (
        <div className="admin-location-card-container">
          <div className="admin-location-header">
            <h1 className="vl-subheading f-500">
              {t("total")} {t("location")}
            </h1>
            <div className="number-label">{total}</div>
          </div>
          <div className="admin-location-body">
            <div className="tile-grid">
              <div className="tile-card">
                <h1 className={`vl-heading f-700 vl-accept`}>{active}</h1>
                <p className={`vl-body f-500  vl-blue`}>
                  {t("active")} {t("location")}
                </p>
              </div>
              <div className="tile-card">
                <h1 className={`vl-heading f-700 vl-reject`}>{inactive}</h1>
                <p className={`vl-body f-500 vl-blue`}>
                  {t("inactive")} {t("location")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {layout === "user" && (
        <div className="admin-location-card-container">
          <div className="admin-location-header">
            <h1 className="vl-subheading f-500">
              {t("total")} {t("users")}
            </h1>
            <div className="number-label">16</div>
          </div>
          <div className="admin-location-body">
            <div className="tile-grid">
              <div className="tile-card">
                <h1 className={`vl-heading f-700 vl-accept`}>12</h1>
                <p className={`vl-body f-500  vl-blue`}>
                  {t("active")} {t("users")}
                </p>
              </div>
              <div className="tile-card">
                <h1 className={`vl-heading f-700 vl-reject`}>04</h1>
                <p className={`vl-body f-500 vl-blue`}>
                  {t("active")} {t("users")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
