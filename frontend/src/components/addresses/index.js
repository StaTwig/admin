import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import AddressDetails from "./addressdetails";
import { Link } from "react-router-dom";
import NoRecordsFound from "../NoRecordsFound";

const Address = (props) => {
  const { addresses } = props;
  return (
    <div className="address">
      <div className="d-flex pl-2 justify-content-between">
        <h1 className="breadcrumb dash">MANAGE ADDRESS</h1>
        {addresses.length < 5 && (
          <div>
            <button type="button" className="btn btn-warning ">
              <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
              <Link
                to="/newaddress"
                className="forgot-link text-decoration-none"
              >
                <span className="txt ">Add New Address</span>
              </Link>
            </button>
          </div>
        )}
      </div>
      <div className={`d-flex row ${addresses.length == 0 ? "w-100" : ""}`}>
        {addresses.map((address, index) => (
          <AddressDetails address={address} key={index} />
        ))}

        {addresses.length == 0 && <NoRecordsFound dClass="w-100" />}
      </div>
    </div>
  );
};

export default Address;
