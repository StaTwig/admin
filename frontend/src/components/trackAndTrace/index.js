import React from "react";

import 'typeface-roboto';
import totalshipments from "../../assets/icons/Total Shipments Completed.svg";
import totalinventory from "../../assets/icons/Total Inventory Added.svg";
import currentshipment from "../../assets/icons/Current Shipment InTransit.svg";
import Totalshipments from "../../assets/icons/Total Shipments.svg";
import shipmentsdelayed from "../../assets/icons/Total Shipments Delayed.svg";
import Add from '../../assets/icons/add.svg';
import searchingIcon from "../../assets/icons/searching@2x.png";
import Table from '../shared/table';
import './style.scss';


const trackAndTrace = () => {
  return (
    <div className="overview">
                  <div className="d-flex justify-content-between">
                        <h1 className="breadcrumb">Track & Trace</h1>
                        <div className="d-flex">
                              
                              <button className="btn btn-primary fontSize20 font-bold">
                                    <img src={Add} width='20' height='20' className="mr-2" />
                                    <span>All Filter</span>
                              </button>
                              <div className="search-form">
                                   <input type="text" className="form-control search-field" />
                                <img src={searchingIcon} alt="searching" />
                            </div>
                        </div>
                  </div>
      <div className="d-flex bg-grey row m-0">
        <div className="panel col">
          <img id="car1" src={totalshipments} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Transactions</div>
            <div className="count">532</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car3" src={totalinventory} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Shipments</div>
            <div className="count" >132</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car1" src={currentshipment} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Blocks</div>
            <div className="count">132</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car1" src={Totalshipments} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Users</div>
            <div className="count">132</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car1" src={shipmentsdelayed} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Units Shipped</div>
            <div className="count">132</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
      <h1 className="breadcrumb">Latest Transactions</h1>       
                        <Table />
                  </div>
    </div >
  );
};

export default trackAndTrace;

