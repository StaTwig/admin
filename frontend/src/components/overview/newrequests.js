import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";

const NewRequests = (props) => {
  const {
    requestRow,
    setShowModal,
    setData,
    rejectApproval,
    rindex,
    setTitle,
    setBtnTxt,
  } = props;
  return (
    <div className="card flex-row justify-content-between rounded border border-white shadow bg-white mt-3 ml-2 p-3">
      <div className="d-flex flex-row w-50">
        <div className="userPic rounded">
          <img src={requestRow?.photoId} alt="User" className="rounded" />
        </div>
        <div className="pl-1 w-100">
          <span className="pb-2">
            {requestRow?.firstName + " " + requestRow?.lastName}
          </span>
          <div className="pb-2 txtColor d-flex ">
            <span className="txtWrapR text-decoration-underline">
              {requestRow?.walletAddress}
            </span>
          </div>
          <div className="pb-2 d-flex">
            <span className="txtColor">
              {requestRow?.phoneNumber == "" ? "Email: " : "Mobile: "}
            </span>
            <span className="txtWrapR">
              &nbsp;
              {requestRow?.phoneNumber == ""
                ? requestRow?.emailId
                : requestRow?.phoneNumber}
            </span>
          </div>
          {/* <div className="pb-2">
            <span>Organisation: </span>
            <span>{requestRow?.organisationId} </span>
          </div> */}
        </div>
      </div>
      <div className="pl-1">
        <div className="d-grid txtColor">
          <span>Date: {formatDate(requestRow?.createdAt)}</span>
        </div>
        <div className="d-flex flex-row mt-4">
          <button
            type="button"
            className="btn rounded btn-outline-success mr-3 pl-2 pr-2"
            onClick={() => {
              setData({
                id: requestRow?.id,
                ref:
                  requestRow?.phoneNumber == ""
                    ? requestRow?.emailId
                    : requestRow?.phoneNumber,
                rindex: rindex,
              });
              setTitle("ASSIGN USER ROLE");
              setBtnTxt("ASSIGN");
              setShowModal(true);
            }}
          >
            Accept request
          </button>
          <button
            type="button"
            className="btn rounded btn-outline-danger pl-2 pr-2"
            onClick={() => {
              rejectApproval({
                id: requestRow?.id,
                rindex: rindex,
              });
            }}
          >
            Reject request
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRequests;
