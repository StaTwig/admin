import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import DropdownButton from "../../shared/dropdownButtonGroup";

const SentRequests = (props) => {
  return (
    <div
      className={`card rounded ${
        props.disableShadow ? "" : "shadow"
      } bg-white border border-white mt-3 ml-2 p-3 pb-5`}
    >
      <div className="card-body d-flex flex-row justify-content-between mb-5">
        <span className="dropdownLabel txtColor w-50">Organisation Name</span>
        <div className="form-control w-50">
          <DropdownButton name="Select a organisation" />
        </div>
      </div>
      <div className="d-grid">
        <button type="button" className="btn btn-default orangeBtn">
          Send request
        </button>
      </div>
    </div>
  );
};

export default SentRequests;
