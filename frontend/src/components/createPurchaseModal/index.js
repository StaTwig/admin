import React from "react";
import EditTable from '../../shared/table/editTabel';
import updownArrow from "../../assets/icons/up-and-down-dark.svg";
import calenderDark from "../../assets/icons/calendar-grey.svg";
import Add from '../../assets/icons/add.svg';
import './style.scss';

const PurchaseOrder = () => {
  return (
    <div className="Purchase">
      <div className="row">
        <div className="col mr-3">
        <div className="input-group">
            <label htmlFor="shipmentId">Supplier</label>
            <input type="text" className="form-control" placeholder="Select Supplier" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delievery To</label>
            <input type="text" className="form-control" placeholder="Select Person" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
          </div>
        <div className="col mr-3">
         <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location</label>
            <input type="text" className="form-control" placeholder="Select Delivery Location" />
            <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="16" height="16" />
            </div>
          </div>
         </div>
         <div className="col">
         <div className="date">
            Date: 25/03/2020
          </div>
         </div>
         
      </div>
      <hr />
      <EditTable />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>

      <button className="btn btn-orange fontSize20 font-bold">
    <span>REVIEW</span>
        </button>
    </div>
  );
};

export default PurchaseOrder;

