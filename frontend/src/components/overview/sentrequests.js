import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import DropdownButton from "../../shared/dropdownButtonGroup";

const SentRequests = (props) => {
  const { organisationsList, disableShadow, sendAffiliate } = props;
  const [name, setName] = useState("Select a organisation");
  const onSelect = (data) => {
    console.log(data);
    setName(data.name);
  };
  return (
    <div
      className={`card rounded ${
        disableShadow ? "" : "shadow"
      } bg-white border border-white mt-3 ml-2 p-3 pb-5`}
    >
      <div className="card-body mb-5">
        {/* <div className="form-group w-100 justify-content-between d-flex flex-row">
          <span className="dropdownLabel txtColor ">Email ID</span>
          <div className=" w-50 ">
            <input className="form-control" name="email" id="email" />
          </div>
        </div> */}
        <div className="form-group w-100 justify-content-between d-flex flex-row">
          <span className="dropdownLabel txtColor ">Organisation Name</span>
          <div className="form-control w-50 ">
            <DropdownButton
              groups={organisationsList}
              onSelect={onSelect}
              name={name}
              namer="org"
            />
          </div>
        </div>
      </div>
      <div className="d-grid">
        <button
          type="button"
          onClick={sendAffiliate}
          className="btn btn-default orangeBtn"
        >
          Send request
        </button>
      </div>
    </div>
  );
};

export default SentRequests;
