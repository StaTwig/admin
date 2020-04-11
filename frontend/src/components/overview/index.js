import React from "react";
import {
  Link
} from "react-router-dom";
import ChartsPage from '../doughnut'
import SummaryTable from './summaryTable';

import totalshipments from "../../assets/icons/TotalShipmentsCompleted.svg";
import totalinventory from "../../assets/icons/TotalInventoryAdded.svg";
import currentshipment from "../../assets/icons/CurrentShipmentInTransit.svg";
import Totalshipments from "../../assets/icons/TotalShipments.svg";
import shipmentsdelayed from "../../assets/icons/TotalShipmentsDelayed.svg";

import './style.scss';

  const Overview = props => {
  return (
    <div className="overview">
      <h1 className="breadcrumb">OVERVIEW</h1>
      <div className="full-width-ribben">
        <div className="row no-gutters">
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img src={totalshipments} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="title">Total Shipments Completed</div>
                <div className="count">1.3 M <small className="dayStatus">This Year</small></div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img src={totalinventory} alt="truck" />
              </div>

              <div className="d-flex flex-column">
                <div className="title">Total Inventory Added</div>
                <div className="count" >5.4 M <small className="dayStatus">This Year</small></div>
              </div>
            </div>

          </div>
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img src={currentshipment} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="title">Current Shipment in Transit</div>
                <div className="count">53 <small className="dayStatus">Today</small></div>
              </div>
            </div>

          </div>
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img src={Totalshipments} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="title">Total Shipments</div>
                <div className="count">42 <small className="dayStatus">Today</small></div>
              </div>
            </div>

          </div>
          <div className="col">
            <div className="panel border-0">
              <div className="picture truck-bg">
                <img src={shipmentsdelayed} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="title">Total Shipments Delayed</div>
                <div className="count">32 <small className="dayStatus">This Month</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ribben-space">
        <div className="col-sm-12 col-lg-5 col-xl-5 mb-sm-4">
          <div className="custom-card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title font-weight-bold">Inventory Summary</h5>
                <Link to="/newinventory">
                  <button className="btn-primary btn-sm btn"> Add Inventory</button>
                </Link>
              </div>
            </div>
            <div className="card-body">

              <div id="chartjs-render-monitor" ><ChartsPage /></div>
              <div className="total">
                Total Current Inventory
                <div className="value">1200</div>
              </div>

            </div>
            <div className="card-footer">
              <div className="d-flex align-items-center justify-content-center">
                <Link to="/inventory" className="card-link btn btn-outline-primary">
                  View More
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-7 col-xl-7 p-lg-0 mr-lg-0">
          <div className="custom-card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title font-weight-bold">Shipment Summary</h5>
                <Link to="/newshipment">
                  <button className="btn-primary btn-sm btn"> Create Shipment</button>
                </Link>
              </div>
            </div>
            <div className="card-body">
              <SummaryTable {...props}/>
              </div>
            <div className="card-footer">
              <div className="d-flex align-items-center justify-content-center">
                <Link to="/shipments" className="card-link btn btn-outline-primary">
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
