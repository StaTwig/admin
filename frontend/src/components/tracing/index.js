import React from 'react';
import searchingIcon from '../../assets/icons/searching@2x.png';
import Filter from '../../assets/icons/Filter.svg';
import updownarrow from '../../assets/icons/up-and-down-white.svg';
import currentinventory from '../../assets/icons/CurrentInventory.svg';
import CurrentTemperature from '../../assets/icons/CurrentTemperature.png';
import Chart from './temperature';
import Map from './map';
import './style.scss';

const Tracing = props => {
  const tracingShipment = props.shipments[0];
  return (
    <div className="tracing">
      <div className="d-flex justify-content-between mb-3">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div className="allfilterbtn">
              <img src={Filter} />
              <span> All Filter</span>
              <img src={updownarrow} />
            </div>
          </button>
          <img src={searchingIcon} alt="searching" className="search-icon" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 d-flex flex-column col-sm-4">
          <h5 className="head">Shipment Details</h5>
          <div className="panel d-flex justify-content-between mb-3">
            <ul>
              <li className="bold">Transaction ID</li>
              <li className="bold">Shipment ID</li>
              <li className="bold">Client Name</li>
              <li className="bold">Total Quantity</li>
            </ul>
            <ul>
              <li>d790fr5dsf34fgsr65r...</li>
              <li>{tracingShipment.shipmentId}</li>
              <li>{tracingShipment.client}</li>
              <li>{tracingShipment.products[0].quantity}</li>
            </ul>
          </div>
          <h5 className="head">Product List</h5>

          <div className="panel d-flex flex-column">
            <div className="d-flex">
              <div className="icon mr-2 ">
                {tracingShipment.products[0].productName}
              </div>
              <div className="mr-5 bold">
                {tracingShipment.products[0].productName}
              </div>
              <div>
                <span className="bold">Quantity: </span>
                {tracingShipment.products[0].quantity}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <span className="bold">Manufacturer :</span>{' '}
                <span className="manufacturer">
                  {tracingShipment.products[0].manufacturerName}
                </span>
              </div>
            </div>
             <div className="row">
              <div className="col">
                <span className="bold">Mfg Date :</span>
                {tracingShipment.products[0].manufacturingDate}
              </div>
              <div className="col">
                <span className="bold">Exp Date : </span>
                {tracingShipment.products[0].expiryDate}
              </div>
            </div>

          </div>
        </div>
        <div className="col-sm-8">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="panel col">
                <h3 className="head">Geographical Tracking</h3>
                <Map />
              </div>
              <div className="panel">
                <div className="d-flex justify-content-between">
                  <div class="row">
                    <img
                      src={CurrentTemperature}
                      width="20"
                      height="20"
                      className="mr-2"
                    />

                    <div className="d-flex flex-column">
                      <div className="info">Current temperature</div>
                      <div className="info">3°C</div>
                    </div>
                  </div>

                  <div className="d-flex flex-column">
                    <div className="info">Last Upadated on</div>
                    <div className="info">07:00 am</div>
                  </div>
                </div>
                <Chart />
              </div>
            </div>
            <h5 className="head mt-3">Chain of Custody</h5>
            <div className="panel ">
              <div className="d-flex flex-row">
                <ul className="mr-3">
                  <li>
                    <div className="picture transit-bg">
                      <img src={currentinventory} alt="truck" />
                    </div>{' '}
                  </li>
                  <li className="my-3 ml-3">
                    <div className="picture symbol-bg " />
                  </li>
                  <li className="my-3 ml-3">
                    <div className="picture symbol-bg"> </div>
                  </li>
                  <li className="my-3 ml-3">
                    <div className="picture symbol-bg"> </div>
                  </li>
                  <li className="my-3 ml-3">
                    <div className="picture last-bg"> </div>
                  </li>
                </ul>
                <ul className="mr-5">
                  <li className="col">
                    <div>Shipment Number</div>
                    <div>{tracingShipment.shipmentId}</div>{' '}
                  </li>
                  <li className="col">
                    <div>{tracingShipment.supplierLocation}</div>
                    <div>{tracingShipment.shipmentDate}</div>
                  </li>
                  <li className="col">
                    <div>{tracingShipment.deliveryTo}</div>
                    <div>{tracingShipment.estimateDeliveryDate}</div>{' '}
                  </li>
                </ul>
                <ul>
                  <li className="col">
                    <div>Added to inventory</div>
                    <div>Wallet Address: {tracingShipment.supplierAddress}</div>{' '}
                  </li>
                  <li>{tracingShipment.status}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracing;
