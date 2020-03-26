import React from "react";
import EditTable from '../../shared/table/editTabel';
import updownArrow from "../../assets/icons/up-and-down-dark.svg";
import calenderDark from "../../assets/icons/calendar-grey.svg";
import './style.scss';

const NewShipment = () => {
  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE SHIPMENTS</h1>
      <div className="row">
        <div className="col mr-3">
          <div className="form-group">
            <label htmlFor="shipmentId">Shipment ID</label>
            <input type="text" className="form-control" name="shipmentId" placeholder="Enter Shipment ID" />
          </div>
          <div className="form-group">
            <label htmlFor="client">Client</label>
            <input type="text" className="form-control" name="client" placeholder="Enter Client" />
          </div>
        </div>
        <div className="col mr-3">
          <div className="form-group">
            <label htmlFor="shipmentId">Supplier</label>
            <input type="text" className="form-control" name="shipmentId" placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Supplier Location</label>
            <input type="text" className="form-control" placeholder="Select Location" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Shipment Date</label>
            <input type="text" className="form-control" placeholder="Select Shipment Date" />
            <div className="input-group-append">
              <img src={calenderDark} alt="downarrow" width="16" height="16" />
            </div>
          </div>
        </div>
        <div className="col">
        <div className="input-group">
            <label htmlFor="shipmentId">Delivery To</label>
            <input type="text" className="form-control" placeholder="Select" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location</label>
            <input type="text" className="form-control" placeholder="Select Delivery Location" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
         
          <div className="input-group">
            <label htmlFor="shipmentId"> Estimate Delivery Date</label>
            <input type="text" className="form-control" placeholder="Deivery Date" />
            <div className="input-group-append">
              <img src={calenderDark} alt="downarrow" width="16" height="16" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <EditTable />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>
      <hr />
      
      <div className="d-flex justify-content-between">
      <div className="total">Grand Total</div>
      <div className="value">0</div>
      <div className="d-flex ">
      <button className="btn-primary btn">Assign Shipmnet Order</button>
      <button className="btn-primary btn">Proceed To Review</button>
      </div>
      </div>
    </div>
   
  );
};

export default NewShipment;

