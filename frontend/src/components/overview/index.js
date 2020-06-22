import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import ChartsPage from '../doughnut'
import SummaryTable from './summaryTable';
import { getLastDates } from '../../utils/dateHelper';
import totalshipments from "../../assets/icons/TotalShipmentsCompleted.svg";
import totalinventory from "../../assets/icons/TotalInventoryAdded.svg";
import currentshipment from "../../assets/icons/CurrentShipmentInTransit.svg";
import Totalshipments from "../../assets/icons/TotalShipments.svg";
import shipmentsdelayed from "../../assets/icons/TotalShipmentsDelayed.svg";

import './style.scss';

  const Overview = props => {
    const [Hours24Count, set24HoursCount] =useState('');
    const [Months3Count, set3MonthsCount] =useState('');
    const [Months6Count, set6MonthsCount] =useState('');
    const [AllTimeCount, setAllTimeCount] =useState('');
    const [TotalInventoryAdded, setTotalInventoryAdded] =useState('')
    const [TotalInventory, setTotalInventory] =useState('')
    
 var key;
    
    useEffect(() => {
    const manufacturingDates = props.shipments.map((data, index) => {
      return data.shipmentDate;
    });
    const InventoryDates = props.inventories.map((data, index) => {
      key=index+1;
       return data.length;
      
     });
    

    const last24hrsDates = getLastDates(manufacturingDates, 24);
    const last3Months = getLastDates(manufacturingDates, 2190);
    const last6Months = getLastDates(manufacturingDates, 14380);
      set24HoursCount(last24hrsDates.length);
      set3MonthsCount(last3Months.length);
      set6MonthsCount(last6Months.length)
      setAllTimeCount(manufacturingDates.length);
      setTotalInventoryAdded(key);
    })

    let total = 0;

    {props.inventories.map(inventory => (
      
    total += JSON.parse(inventory.quantity)
    ))}

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
                <div className="title">Total Shipments</div>
                <div className="count1">{AllTimeCount}<small className="dayStatus ml-1">This Year</small></div>
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
                <div className="count2" > {total} <small className="dayStatus">ThisYear</small></div>
              </div>
            </div>

          </div>
          <div className="col">
            <div className="panel">
              <div className="picture truck-bg">
                <img className= "currentintransit" src={currentshipment} alt="truck" />
              </div>
              <div className="d-flex flex-column">
                <div className="title">Current Shipment in Transit</div>
                <div className="count3">{Months6Count}<small className="dayStatus ml-1">Last 6 Month</small></div>
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
                <div className="count4">{Months3Count}<small className="dayStatus ml-1">Last 3 Month</small></div>
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
                <div className="count5">{Hours24Count} <small className="dayStatus">Today</small></div>
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
                <Link to="/inventory">
                <button className=" card-link btn btn-outline-primary"> View More</button>
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
                <Link to="/shipments">
                <button className=" card-link btn btn-outline-primary"> View More</button>
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
