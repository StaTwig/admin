import React from "react";

import 'typeface-roboto';
import totalshipments from "../../assets/icons/TotalShipmentsCompleted.svg";
import totalinventory from "../../assets/icons/TotalInventoryAdded.svg";
import currentshipment from "../../assets/icons/CurrentShipmentInTransit.svg";
import Totalshipments from "../../assets/icons/TotalShipments.svg";
import shipmentsdelayed from "../../assets/icons/TotalShipmentsDelayed.svg";
import Filter from '../../assets/icons/Filter.svg';
import downarrow from "../../assets/icons/drop-down.svg";
import Table from '../shared/table';
import './style.scss';


const trackAndTrace = () => {
  return (
    <div className="trackTrace">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div>
              <img src={Filter} width='16' height='16' className="mr-2" />
              <span>All Filter</span>
            </div>
            <img src={downarrow} width='14' height='14' />
          </button>
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
        <h1>Latest Transactions</h1>
        <Table />
      </div>
    </div >
  );
};

export default trackAndTrace;

