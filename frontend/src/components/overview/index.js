import React from "react";

import 'typeface-roboto';
import totalshipments from "../../assets/icons/Total Shipments Completed.svg";
import totalinventory from "../../assets/icons/Total Inventory Added.svg";
import currentshipment from "../../assets/icons/Current Shipment InTransit.svg";
import Totalshipments from "../../assets/icons/Total Shipments.svg";
import shipmentsdelayed from "../../assets/icons/Total Shipments Delayed.svg";
import './style.scss';

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

      <div className="row pt-5">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Inventory Summary</h5>
                <button className="btn-primary btn"> Add Inventory</button>
              </div>

              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
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
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
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

