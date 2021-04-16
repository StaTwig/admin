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
            <div className="col" style={{minHeight: 400}} >
              <Map />
            </div>
          </div>
          <div className="panel commonpanle row shadow bg-white mb-4">
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
        <div className="col row ml-3" >
          <div className="col-12">
            <div className=" panel commonpanle  bg-light">
              <h6 className=" text-primary mb-4">CHAIN OF CUSTODY</h6>
              <div className="row orderTxt">
                <div className="col-1">
                  <div className="picture recived-bg">
                    <img src={Package} alt="package"/>
                  </div>
                </div>
                <div className="col ">
                  <div className="">
                    <div className="text-muted ">Order ID</div>
                    <div className="font-weight-bold ">PO89898988989898</div>
                  </div>
                 </div>
              </div>
              <div className="">
                <ChainOfCustody index="0" pindex="1" container="0" />
                <ChainOfCustody index="2" pindex="1" container="2" />
                <ChainOfCustody index="4" pindex="2" container="3" />
                <ChainOfCustody index="4" pindex="1" container="4" />
                {/* <LineTo borderColor="#a8a8a8" fromAnchor="bottom" toAnchor="top" from="recived-bg" to="big-dot" />
                <LineTo borderColor="#a8a8a8" fromAnchor="3% 100%" toAnchor="top" from="container-0" to="dot-2" />
                <LineTo borderColor="#a8a8a8" fromAnchor="3% 100%" toAnchor="top" from="container-2" to="dot-4" /> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Track;