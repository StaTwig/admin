import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import dummyimage from "../../assets/brands/mobile.png";

const AffiliateOrganisation = (props) => {
  return (
    <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row p-0 pl-2 pr-2">
        <div className="d-flex w-20 flex-row ">
          <div
            className="bg-info rounded mr-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div className="text-left">
            <h5 className="text-primary mb-0">Bharat Biotech</h5>
            <span className="">Manufacturer</span>
          </div>
        </div>
        <div className="d-flex w-20 flex-column">
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor w-50">Request received: </span>
            <span className="w-50">28/02/2021</span>
          </div>
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor w-50">Affiliated Since: </span>
            <span className="w-50">28/02/2021 </span>
          </div>
        </div>
        <div className="d-flex w-20 flex-column">
          <div className="pb-2">
            <span className="txtColor">No of users: </span>
            <span>8</span>
          </div>
          <div className="pb-2">
            <button
              style={{ height: 35 }}
              type="button"
              className="btn btn-primary rounded"
            >
              View Users
            </button>
          </div>
        </div>
        <div className="d-flex w-20 flex-row justify-content-between pr-2">
          <p className="txtColor w-50">Delivery Addresses: </p>
          <p className="w-50">
            &nbsp;Genome Valley, Hyderabad, Telangana 5000078
          </p>
        </div>
        <div className="w-20">
          <button type="button" className="btn btn-outline-dark">
            Unaffiliate Organisation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateOrganisation;
