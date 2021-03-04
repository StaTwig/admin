import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";

const RecentRequests = (props) => {
  const { reqSent } = props;

  return (
    <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row justify-content-between p-2">
        <div className="userPic txtWrapR rounded w-25">
          <img
            src={reqSent.from.photoUrl}
            alt="User"
            className="rounded mr-1"
          />
          <span className=" txtWrapR">{reqSent.from.name}</span>
        </div>
        <span className="pl-1 txtWrapR w-25">{reqSent.from.organisation}</span>
        <span className="pl-1 txtWrapR w-25">{reqSent.from.emailId}</span>
        <span className="pl-1 txtWrapR w-25">
          {formatDate(reqSent.createdAt)}
        </span>
        <span className="pl-1 txtWrapR w-25 text-decoration-underline">
          <a href="#" className="text-decoration-underline">
            {reqSent.from.walletAddress}
          </a>
        </span>
      </div>
    </div>
  );
};

export default RecentRequests;
