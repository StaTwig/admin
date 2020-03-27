import React from "react";

import 'typeface-roboto';
import TotalTransactions from "../../assets/icons/TotalTransactions.svg";
import TotalShipments from "../../assets/icons/TotalShipments.svg";
import TotalBlocks from "../../assets/icons/TotalBlocks.svg";
import TotalUsers from "../../assets/icons/TotalUsers.svg";
import TotalUnitsShipped from "../../assets/icons/TotalUnitsShipped.svg";
import Filter from '../../assets/icons/Filter.svg';
import updownarrow from "../../assets/icons/up-and-down-white.svg";
import searchingIcon from "../../assets/icons/searching@2x.png";
import Table from '../../shared/table';
import './style.scss';


const trackAndTrace = () => {
  return (
    <div className="trackTrace">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div className="flex-basis-80">
              <img src={Filter} width='16' height='16' className="mr-2" />
              <span> All Filter</span>
            </div>
            <img src={updownarrow} width='14' height='14' />
          </button>
          <img src={searchingIcon} alt="searching" className="search-icon" />
        </div>
      </div>
      <div className="d-flex bg-grey row m-0">
        <div className="panel col">
        <div className="picture truck-bg">
          <img src={TotalTransactions} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title">Total Transactions</div>
            <div className="count">532</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
        <div className="picture truck-bg">
          <img src={TotalShipments} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title">Total Shipments</div>
            <div className="count" >132</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
        <div className="picture truck-bg">
          <img src={TotalBlocks} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title">Total Blocks</div>
            <div className="count">132</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <div className="picture truck-bg">
          <img src={TotalUsers} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title">Total Users</div>
            <div className="count">132</div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
        <div className="picture truck-bg">
          <img src={TotalUnitsShipped} alt="truck" />
          </div>
          
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

