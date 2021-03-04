import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Maps from "./maps";
import { Link } from "react-router-dom";

const AddressDetails = (props) => {
  const { address } = props;
  return (
    <div className="card flex-row add-width justify-content-between rounded border border-white shadow bg-white m-3 p-3">
      <div className="d-flex flex-row justify-content-between w-50">
        <div>
          <h5 className="text-primary">Head Office</h5>
          <p className=" mb-0">
            {address.region.name + ", " + address.country.name}
            <span className="row justify-content-md-center">&nbsp;</span>
          </p>
          <p className="txtColor pt-0">{address.postalAddress}</p>
          <p className="txtColor">Zip code: 400016</p>
        </div>
      </div>
      <div className="w-50 float-right">
        <div className="d-flex flex-row-reverse">
          {" "}
          <Link
            to={`/editaddress/${JSON.stringify(address.id)}`}
            className="forgot-link text-decoration-none"
          >
            <button className="bg-white btn-outline-primary d-width">
              <i className="fa fa-pencil"></i>
              <span className="ml-2">Edit</span>
            </button>
          </Link>
        </div>
        <div className="mt-3 d-flex mapC ">
          <Maps
            lan={address.location.latitude}
            lng={address.location.longitude}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
