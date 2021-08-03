import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { formatDate } from "../../utils/dateHelper";

const RecentRequests = (props) => {
  const { reqSent } = props;

  return (
    <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row justify-content-between p-1">
        <div className="userPic txtWrapR rounded w-25 align-self-center">
          <img src={reqSent.user.photoId} alt="User" className="rounded mr-1" />
          <span className=" txtWrapR">
            {reqSent.user.firstName + " " + reqSent.user.lastName}
          </span>
        </div>
        <span className="pl-1 txtWrapR w-25 text-center align-self-center">
          {reqSent.name}
        </span>
        <span className="pl-1 txtWrapR w-25 text-center align-self-center">
          {reqSent.user.emailId}
        </span>
        <span className="pl-1 txtWrapR w-25 text-center align-self-center">
          {formatDate(reqSent.affiliations.request_date)}
        </span>
        <span className="pl-1 txtWrapR w-25 text-center align-self-center text-decoration-underline">
          <a href="#" className="text-decoration-underline">
            {reqSent.user.walletAddress}
          </a>
        </span>
      </div>
    </div>
  );
};

export default RecentRequests;
