import React from "react";
import EditTable from '../../shared/table/editTabel';
import updownArrow from "../../assets/icons/up-and-down-dark.svg";
import calenderDark from "../../assets/icons/calendar-grey.svg";
import Add from '../../assets/icons/add.svg';
import './style.scss';

const NewShipment = () => {
  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE NEW SHIPMENT</h1>
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
            <label htmlFor="shipmentId">Email address</label>
            <input type="text" className="form-control" name="shipmentId" placeholder="Enter Shipment ID" />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Supplier Location</label>
            <input type="text" className="form-control" placeholder="Recipient's username" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Supplier Date</label>
            <input type="text" className="form-control" placeholder="Recipient's username" />
            <div className="input-group-append">
              <img src={calenderDark} alt="downarrow" width="16" height="16" />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="shipmentId">Email address</label>
            <input type="text" className="form-control" name="shipmentId" placeholder="Enter Shipment ID" />
          </div>
          <div className="form-group">
            <label htmlFor="client">Email address</label>
            <input type="text" className="form-control" name="client" placeholder="Enter Client" />
          </div>
          <div className="form-group">
            <label htmlFor="client">Email address</label>
            <input type="text" className="form-control" name="client" placeholder="Enter Client" />
          </div>
        </div>
      </div>
      <hr />
      <EditTable />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>
    </div>
  );
};

export default NewShipment;

