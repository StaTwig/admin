import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";
import { getAddress } from "../../utils/commonHelper";
import { config } from "../../config";

const LocationRequests = (props) => {
  const {
    row,
    setShowModal,
    setData,
    rejectApproval,
    rindex,
    setTitle,
    setBtnTxt,
    modifyLocations,
  } = props;
  const imgDomain = config().imgDomainUrl;
  return (
    <div className="card flex-row justify-content-between rounded border border-white shadow bg-white mt-3 ml-2 p-3">
      <div className="d-flex flex-row w-50">
        <div className="userPic rounded">
          <img
            src={imgDomain + row?.employee.photoId}
            alt="User"
            className="rounded"
          />
        </div>
        <div className="pl-1 w-100">
          <span className="pb-2">
            {row?.employee.firstName + " " + row?.employee.lastName}
          </span>
          <div className="pb-2 txtColor d-flex ">
            <span className="txtWrapR text-decoration-underline">
              {row?.employee.walletAddress}
            </span>
          </div>
          <div className="pb-2 d-flex">
            <span className="txtColor">
              {row?.employee.phoneNumber ? "Mobile: " : "Email: "}
            </span>
            <span className="txtWrapR">
              &nbsp;
              {row?.employee.phoneNumber
                ? row?.employee.phoneNumber
                : row?.employee.emailId}
            </span>
          </div>
          <div className="pb-2">
            <span className="txtColor">Location: </span>
            <span>{getAddress(row?.warehouseAddress)} </span>
          </div>
        </div>
      </div>
      <div className="pl-1">
        <div className="d-grid txtColor">
          <span>Date: {formatDate(row?.createdAt)}</span>
        </div>
        <div className="d-flex flex-row mt-5 pt-5">
          <button
            type="button"
            className="btn rounded btn-outline-success mr-3 pl-2 pr-2"
            onClick={() => {
              modifyLocations({
                id: row?.id,
                eid: row?.employee.id,
                rindex: rindex,
                type: 1,
              });
            }}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn rounded btn-outline-danger pl-2 pr-2"
            onClick={() => {
              modifyLocations({
                id: row?.id,
                eid: row?.employee.id,
                rindex: rindex,
                type: 2,
              });
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationRequests;
