import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import dummyimage from "../../assets/brands/mobile.png";

const ReceivedRecentRequests = (props) => {
  return (
    <div className="card rounded shadow bg-white border border-white mt-1 ml-1 p-1 mb-3">
      <div className="card-body d-flex flex-row p-0  pl-2 pr-2">
        <div className="d-flex w-20 flex-row ">
          <div
            className="bg-info rounded mr-2"
            style={{ width: 40, height: 40 }}
          >
            <div className="userPic rounded">
              <img src={dummyimage} alt="User" className="rounded" />
            </div>
          </div>
          <div className="pl-1">
            <div>
              <h5 className="text-primary mb-0 txtWrapQ">Alan adams</h5>
            </div>
            <div className="txtWrapQ">
              <span className="txtColor txtWrapQ">
                1mdnvjsdbsdjhjsdfjhjhsdjfhj
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex w-30 pl-1 flex-column text-left">
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor width30">Email: </span>
            <span className="txtWrapQ width70">email@email.com</span>
          </div>
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor width30">Organisation: </span>
            <span className="txtWrapQ width70">ABC Trading LTD. </span>
          </div>
        </div>
        <div className="d-flex w-20 pl-1 flex-column text-left">
          <div className="pb-2 d-flex pr-2">
            <span className="txtColor">Date: </span>
            <span className="txtWrapQ">&nbsp;18/02/2021</span>
          </div>
        </div>
        <div className="d-flex w-30 pl-1">
          <button
            type="button"
            className="btn rounded btn-outline-success mr-3 "
            onClick={() => props.setShowModal(true)}
          >
            Accept request
          </button>
          <button type="button" className="btn rounded btn-outline-danger">
            Reject request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedRecentRequests;
