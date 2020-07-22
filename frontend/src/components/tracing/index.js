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
              <li>Transaction ID</li>
              <li>Shipment ID</li>
              <li>Client Name</li>
              <li>Total Quantity</li>
            </ul>
            <ul>
              <li className="bold">d790fr5dsf34fgsr65r...</li>
              <li className="bold">{tracingShipment.shipmentId}</li>
              <li className="bold">{tracingShipment.client}</li>
              <li className="bold">{tracingShipment.products[0].quantity}</li>
            </ul>
          </div>
          <h5 className="head">Product List</h5>

          <div className="panel d-flex flex-column">
            <div className="d-flex justify-content-between mb-3">
              <div className="row">
              <div className="icon mr-3">
                {tracingShipment.products[0].productName}
              </div>
              <div className="manufacturer mt-2">
                {tracingShipment.products[0].productName}
              </div>
              </div>
              <div className="label">
               Quantity: 
               <span className="manufacturer"> {tracingShipment.products[0].quantity}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="label mr-3">Manufacturer :</div>{' '}
                <div className="manufacturer">
                  {tracingShipment.products[0].manufacturerName}
                </div>
               </div>
             <div className="d-flex justify-content-between">
               <div className="row">
                <div className="label mr-2">Mfg Date :</div>
                <div className="bold">{tracingShipment.products[0].manufacturingDate}</div>
              </div>
              <div className="row">
                <div className="label mr-2">Exp Date : </div>
                <div className="bold">{tracingShipment.products[0].expiryDate}</div>
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
            <div className="panel d-flex flex-column">
              <div className="d-flex flex-column">
                <div className="row mb-4">
                    <div className="picture transit-bg">
                      <img src={currentinventory} alt="truck" />
                    </div>{' '}
                  <div className="col">
                  <div className="label">Shipment Number</div>
                  <div className="font-weight-bold">{tracingShipment.shipmentId}</div>{' '}
                  </div>
                  </div>
                  <div className="row mb-4">
                  <div className="picture1"><div className="symbol-bg"></div></div>
                  <div className="col">
                  <div>{tracingShipment.supplierLocation}</div>
                  <div className="wallet">{tracingShipment.shipmentDate}</div>
                  </div>
                  <div className="col">
                  <div>Added to inventory by the manufacturer</div>
                  <div className="wallet">Wallet Address :{tracingShipment.receiver}</div>{' '}
                  </div>
                  </div>

                  <div className="row mb-4">
                  <div className="picture1"><div className="symbol-bg"></div></div>
                  <div className="col">
                  <div>{tracingShipment.supplierLocation}</div>
                  <div className="wallet">{tracingShipment.estimateDeliveryDate}</div>
                  </div>
                  <div className="col">
                  <div>Dispatched from {tracingShipment.products[0].manufacturerName} Warehouse</div>
                  <div className="wallet">Wallet Address :{tracingShipment.receiver}</div>{' '}
                  </div>
                  </div>

                  <div className="row mb-4">
                  <div className="picture1"><div className="symbol-bg"></div></div>
                   <div className="col">{tracingShipment.deliveryLocation}</div>
                  <div className="col">{tracingShipment.status}</div>{' '}
                  </div>
                  
                  {tracingShipment.status=='Shipped' ? null : 
                  <div className="row">
                  <div className="picture1"><div className="last-bg"></div></div>
                   <div className="col">{tracingShipment.deliveryLocation}</div>
                  <div className="col">Pending Delivered</div>{' '}
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracing;
