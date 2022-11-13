import React from "react";
import Avatar from "@mui/material/Avatar";
import "./LocationCard.css";

export default function LocationCard({ layout, org }) {
  return (
    <>
      {layout === "location" && (
        <div className="admin-location-card-container">
          <div className="admin-location-header">
            <Avatar className="location-avatar">{org.name[0]}</Avatar>
            <h1 className="vl-subheading f-700">
              {org.name}
            </h1>
          </div>
          <div className="admin-location-body">
            <div className="admin-location-card-grid">
              <i className="fa-solid fa-user vl-blue"></i>
              <p className="vl-body f-400 vl-grey-sm">Manufacterer</p>
            </div>
          </div>
        </div>
      )}

      {layout === "user" && (
        <div className="admin-location-card-container">
          <div className="admin-location-header">
            <Avatar className="location-avatar">R</Avatar>
            <h1 className="vl-subheading f-700">
              {org.name}
            </h1>
          </div>
          <div className="admin-location-body">
            <div className="admin-location-card-grid">
              <i className="fa-solid fa-user vl-blue"></i>
              <p className="vl-body f-400 vl-grey-sm">MAX101</p>
            </div>
            <div className="admin-location-card-grid">
              <i className="fa-solid fa-location-dot vl-blue"></i>
              <p className="vl-body f-400 vl-grey-sm">
                IT Hub, VP road Pune Maharashtra 400096 India
              </p>
            </div>
            <div className="admin-location-card-grid">
              <i className="fa-solid fa-city vl-blue"></i>
              <p className="vl-body f-400 vl-grey-sm">Hyderbad</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
