import React from "react";

import 'typeface-roboto';
import totalshipments from "../../assets/icons/Total Shipments Completed.svg";
import totalinventory from "../../assets/icons/Total Inventory Added.svg";
import currentshipment from "../../assets/icons/Current Shipment InTransit.svg";
import Totalshipments from "../../assets/icons/Total Shipments.svg";
import shipmentsdelayed from "../../assets/icons/Total Shipments Delayed.svg";
import dp from "../../assets/icons/harsha.jpg";
import './style.scss';
import ChartsPage from '../doughnut'

const Overview = () => {
  return (
    <div className="overview">
      <h1 className="breadcrumb">OVERVIEW</h1>
      <div className="d-flex bg-grey row m-0">
        <div className="panel col">
          <img id="car1" src={totalshipments} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Shipments Completed</div>
            <div className="count">1.3 M <small className="dayStatus">This Year</small></div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car3" src={totalinventory} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Inventory Added</div>
            <div className="count" >5.4 M <small className="dayStatus">This Year</small></div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car1" src={currentshipment} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Current Shipment in transit</div>
            <div className="count">53 <small className="dayStatus">Today</small></div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car1" src={Totalshipments} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Shipments</div>
            <div className="count">42 <small className="dayStatus">Today</small></div>
          </div>
        </div>
        <span className="divider" />
        <div className="panel col">
          <img id="car1" src={shipmentsdelayed} className="rounded rounded-circle" />
          <div className="d-flex flex-column">
            <div className="title">Total Shipments Delayed</div>
            <div className="count">32 <small className="dayStatus">This Month</small></div>
          </div>
        </div>
      </div>

      <div className="row spacer20">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Inventory Summary</h5>
                <button className="btn-primary btn"> Add Inventory</button>
              </div>
              <div id="chartjs-render-monitor" ><ChartsPage/></div>
              <div id="total">Total Current Inventory</div>
                <div id="value">1200</div>
              <a href="#" className="card-link btn btn-outline-primary">View More</a>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Shipment Summary</h5>
                <button className="btn-primary btn"> Create Shipment</button>
              </div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Client</th>
                    <th scope="col">Shipment ID</th>
                    <th scope="col">Shipping Date</th>
                    <th scope="col">Current Location</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><img className="image" src={dp} width="25px" /></th>
                    <td>Andrew Mctyre</td>
                    <td>3987</td>
                    <td>29/03/2014</td>
                    <td>New York</td>
                    <td>8°C</td>
                    <td><span class="badge badge-pill badge-success p-2">Received</span></td>
                  </tr>
                  <tr>
                    <th scope="row"><img className="image" src={dp} width="25px" /></th>
                    <td>Jacob Smith</td>
                    <td>4128</td>
                    <td>01/08/1997</td>
                    <td>Sydney</td>
                    <td>6°C</td>
                    <td><span class="badge badge-pill badge-warning p-2">In Transit</span></td>
                  </tr>
                  <tr>
                    <th scope="row"><img className="image" src={dp} width="25px" /></th>
                    <td>Larry Bird</td>
                    <td>4128</td>
                    <td>01/08/1997</td>
                    <td>Mumbai</td>
                    <td>6°C</td>
                    <td><span class="badge badge-pill badge-light p-2">On  Hold</span></td>
                  </tr>
                  <tr>
                    <th scope="row"><img className="image" src={dp} width="25px" /></th>
                    <td >Vince McMohan</td>
                    <td>4128</td>
                    <td>01/08/1997</td>
                    <td>Brimingaham</td>
                    <td>6°C</td>
                    <td><span class="badge badge-pill badge-danger p-2">Cancelled</span></td>
                  </tr>
                  <tr>
                    <th scope="row"><img className="image" src={dp} width="25px" /></th>
                    <td >Larry Bird</td>
                    <td>4128</td>
                    <td>01/08/1997</td>
                    <td>Cape Town</td>
                    <td>6°C</td>
                    <td><span class="badge badge-pill badge-success p-2 ">Received</span></td>
                  </tr>
                  <tr>
                    <th scope="row"><img className="image" src={dp} width="25px" /></th>
                    <td >Peter Skye</td>
                    <td>4128</td>
                    <td>01/08/1997</td>
                    <td>Wellington</td>
                    <td>6°C</td>
                    <td ><span class="badge badge-pill badge-success p-2">Received</span></td>
                  </tr>
                </tbody>
              </table>

              <a href="#" className="card-link btn btn-outline-primary">View More</a>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Overview;

