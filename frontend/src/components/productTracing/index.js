import React from 'react';
import searchingIcon from '../../assets/icons/searching@2x.png';
import Filter from '../../assets/icons/Filter.svg';
import updownarrow from '../../assets/icons/up-and-down-white.svg';
import currentinventory from '../../assets/icons/CurrentInventory.svg';
import CurrentTemperature from '../../assets/icons/CurrentTemperature.png';
import Chart from './temperature';
import Map from './map';
import './style.scss';

const ProductTracing = props => {
  return (
    <div className="productTracing">
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
      <div className="row justify-content-between">
        <div className="d-flex flex-column">
          <h5 className="head">Product Details</h5>
          <div className="panel d-flex justify-content-between">
            <ul>
              <li>Transaction ID</li>
              <li>Shipment ID</li>
              <li>Client Name</li>
              <li>Total Quantity</li>
              <li>Total Quantity</li>
              <li>Total Quantity</li>
              <li>Total Quantity</li>
            </ul>
            <ul>
  <li className="bold">4f275a0b1403hshsj...</li>
              <li className="bold">993883</li>
              <li className="bold">unicef</li>
              <li className="bold">900</li>
              <li className="bold">900</li>
              <li className="bold">900</li>
              <li className="bold">900</li>
            </ul>
          </div>
          </div>
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
                  <div className="font-weight-bold">123</div>{' '}
                  </div>
                  </div>
                  <div className="row mb-4">
                  <div className="picture1"><div className="symbol-bg"></div></div>
                  <div className="col">
                  <div>...</div>
                  <div className="wallet">...</div>
                  </div>
                  <div className="col">
                  <div>Added to inventory by the manufacturer</div>
                  <div className="wallet">Wallet Address :....</div>{' '}
                  </div>
                  </div>

                  <div className="row mb-4">
                  <div className="picture1"><div className="symbol-bg"></div></div>
                  <div className="col">
                  <div>....</div>
                  <div className="wallet">....</div>
                  </div>
                  <div className="col">
                  <div>Dispatched from ..... Warehouse</div>
                  <div className="wallet">Wallet Address :....</div>{' '}
                  </div>
                  </div>

                  <div className="row mb-4">
                  <div className="picture1"><div className="symbol-bg"></div></div>
                   <div className="col">......</div>
                  <div className="col">...</div>{' '}
                  </div>
                
              </div>
      </div>
    </div>
  );
};

export default ProductTracing;


  
                  /*{tracingShipment.status=='Shipped' ? null : 
                  <div className="row">
                  <div className="picture1"><div className="last-bg"></div></div>
                   <div className="col">{tracingShipment.deliveryLocation}</div>
                  <div className="col">Pending Delivered</div>{' '}
                  </div>}*/