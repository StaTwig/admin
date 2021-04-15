import React, { useState } from "react";
import Chart from "./temperature";
import Map from "./Map";
import CurrentTemperature from "../../assets/icons/thermometer.svg";
import ChainOfCustody from "./chainofcustody";
import Package from '../../assets/icons/package.svg';
import LineTo from 'react-lineto';
import "./style.scss";

const Track = (props) => {
  const shippmentChainOfCustodyData = props.shippmentChainOfCustodyData;

  return (
    <div className="track">
      <div className="row justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row mb-4">
            <div style={{minHeight: 400}} >
              <Map />
            </div>
          </div>
          <div className="panel commonpanle row shadow position-absolute bg-white mb-4">
            <div className="row col-12">
              <div class="col row ml-3">
                <div className="arrow col-1 mr-2">
                  <img src={CurrentTemperature} width="20" height="20" />
                </div>

                <div className="col">
                  <div className="info">Current temperature</div>
                  <div className="info">3°C</div>
                </div>
              </div>

              <div className="col">
                <div className="info col">Last Upadated on</div>
                <div className="info col">07:00 am</div>
              </div>
            </div>
            <div className="row col-12">
            <Chart /></div>
          </div>
        </div>
        <div className="col ml-3">
          <div className="">
            <div className=" panel commonpanle  bg-light">
              <h6 className="heading mb-4">CHAIN OF CUSTODY</h6>
              <div className="row orderTxt">
                <div className="col-1">
                  <div className="picture recived-bg">
                    <img src={Package} alt="package"/>
                  </div>
                </div>
                <div className="col ">
                  <div className="mb-4">
                    <div className="text-muted ">Order ID</div>
                    <div className="font-weight-bold ">PO89898988989898</div>
                  </div>
                 </div>
              </div>
              <div>
                <ChainOfCustody index="0" />
                <ChainOfCustody index="3" />
                <ChainOfCustody index="5" />
                <LineTo borderColor="#a8a8a8" fromAnchor="bottom" toAnchor="top" from="recived-bg" to="big-dot" />
                <LineTo borderColor="#a8a8a8" fromAnchor="4.35% 100%" toAnchor="top" from="container-3" to="dot-5" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Track;