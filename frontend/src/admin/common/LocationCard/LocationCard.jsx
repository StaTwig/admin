import React from "react";
import Avatar from "@mui/material/Avatar";
import "./LocationCard.css";
import { productDetailsByShipmentId } from "../../../actions/shipmentActions";
import Product from "../../../shared/dashbar/product";

export default function LocationCard({ layout, org, product }) {
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
              <p className="vl-body f-400 vl-grey-sm">{product.title}</p>
            </div>
            <div className="admin-location-card-grid">
              <i className="fa-solid fa-location-dot vl-blue"></i>
              <p className="vl-body f-400 vl-grey-sm">
                {product.postalAddress}
              </p>
            </div>
            <div className="admin-location-card-grid">
              <i className="fa-solid fa-city vl-blue"></i>
              <p className="vl-body f-400 vl-grey-sm">{product.warehouseAddress.city}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
