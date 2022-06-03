import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";

const ReceivedRecentRequests = (props) => {
  const { pendingRow, acceptAffliate, rejectAffliate, index } = props;
  return (
    <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row p-0  pl-2 pr-2">
        <div className="d-flex w-20 flex-row ">
          <div className=" rounded mr-2" style={{ width: 40, height: 40 }}>
            <div className="userPic rounded">
              <img
                src={pendingRow?.user.photoId}
                alt="User"
                className="rounded"
              />
            </div>
          </div>
          <div className="pl-1 w-100">
            <div className="d-flex txtWrapQ">
              <span className="text-primary mb-0 txtWrapQ">
                {pendingRow?.user.firstName + " " + pendingRow?.user.lastName}
              </span>
            </div>
            <div className="txtWrapQ">
              <span className="txtColor txtWrapQ">
                {pendingRow?.user.walletAddress}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex w-30 pl-1 flex-column text-left">
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor width30">Email: </span>
            <span className="txtWrapQ width70">{pendingRow?.user.emailId}</span>
          </div>
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor width30">Organisation: </span>
            <span className="txtWrapQ width70">
              {pendingRow?.user.org.name}
            </span>
          </div>
        </div>
        <div className="d-flex w-20 pl-1 flex-column text-left">
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor">Date: </span>
            <span className="txtWrapQ">
              &nbsp;{formatDate(pendingRow?.affiliations.request_date)}
            </span>
          </div>
        </div>
        <div className="d-flex w-30 pl-1">
          <button
            type="button"
            className="btn rounded btn-outline-success mr-3 "
            onClick={() =>
              acceptAffliate({
                id: pendingRow?.affiliations.employee_id,
                rIndex: index,
              })
            }
          >
            Accept request
          </button>
          <button
            type="button"
            className="btn rounded btn-outline-danger"
            onClick={() =>
              rejectAffliate({
                id: pendingRow?.affiliations.employee_id,
                rIndex: index,
              })
            }
          >
            Reject request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedRecentRequests;
