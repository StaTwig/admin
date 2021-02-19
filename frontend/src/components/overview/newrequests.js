import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import dummyimage from "../../assets/brands/user-image/Image73.png";

const NewRequests = (props) => {
  return (
    <div className="card flex-row justify-content-between rounded border border-white shadow bg-white mt-3 ml-2 p-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="userPic rounded">
          <img src={dummyimage} alt="User" className="rounded" />
        </div>
        <div className="pl-1 ">
          <span className="pb-2">Name</span>
          <div className="pb-2 txtColor">
            <span className=" text-decoration-underline">Wallet address</span>
          </div>
          <div className="pb-2">
            <span>Email ID: </span>
            <span>test@org.com</span>
          </div>
          <div className="pb-2">
            <span>Organisation: </span>
            <span>ABC </span>
          </div>
        </div>
      </div>
      <div className="pl-1">
        <div className="d-grid txtColor">
          <span>Date: 22/10/2021</span>
        </div>
        <div className="d-flex flex-row justify-content-around mt-5">
          <button
            type="button"
            className="btn rounded btn-outline-success mr-3 pl-3 pr-3"
            onClick={() => props.setShowModal(true)}
          >
            Accept request
          </button>
          <button
            type="button"
            className="btn rounded btn-outline-danger pl-3 pr-3"
          >
            Reject request
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRequests;
