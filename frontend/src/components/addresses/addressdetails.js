import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Maps from "./maps";

const AddressDetails = (props) => {
  return (
    <div className="card flex-row add-width justify-content-between rounded border border-white shadow bg-white m-3 p-3">
      <div className="d-flex flex-row justify-content-between w-50">
        <div>
          <h5 className="text-primary">Head Office</h5>
          <p className="text-decoration-underline mb-0">
            City, State, Country
            <span className="row justify-content-md-center">-</span>
          </p>
          <p className="txtColor pt-0">
            50/b, Takshilaapt, Mahakali caves road, Chakala, Andheri West,
            Mumbai
          </p>
          <p className="txtColor">Zip code: 400016</p>
        </div>
      </div>
      <div className="w-50 float-right">
        <div className="d-flex flex-row-reverse">
          <button className="bg-white btn-outline-primary d-width">
            <i className="fa fa-pencil"></i>
            <span className="ml-2">Edit</span>
          </button>
        </div>
        <div className="mt-3 d-flex mapC ">
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
