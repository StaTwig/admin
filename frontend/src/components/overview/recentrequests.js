import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import dummyimage from "../../assets/brands/user-image/Image73.png";

const RecentRequests = (props) => {
  return (
    <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row justify-content-between p-2">
        <div className="userPic txtWrapR rounded w-25">
          <img src={dummyimage} alt="User" className="rounded mr-1" />
          <span className=" txtWrapR">Namessssssssswwwwwwwsssss</span>
        </div>
        <span className="pl-1 txtWrapR w-25">ABC LTD</span>
        <span className="pl-1 txtWrapR w-25">email@test.com</span>
        <span className="pl-1 txtWrapR w-25">22/11/2021</span>
        <span className="pl-1 txtWrapR w-25 text-decoration-underline">
          <a href="#" className="text-decoration-underline">
            1fwedcxvxcfffffffffffv
          </a>
        </span>
      </div>
    </div>
  );
};

export default RecentRequests;
