import React from "react";
import ProductsTable from './products';
import updownArrow from "../../assets/icons/up-and-down-dark.svg";
import './style.scss';

const productTableData = {
  tableHeader: ['Product Name', 'Manufacturer', 'Quantity']
}

const PurchaseForm = () => {
  return (
    <div className="purchaseform">
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Supplier</label>
          <input type="text" className="form-control" placeholder="Select Supplier" />
          <div className="input-group-append">
            <img src={updownArrow} alt="downarrow" width="16" height="16" />
          </div>
        </div>
        <p>Date: 25/03/2020</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Delievery To</label>
          <input type="text" className="form-control" placeholder="Select Person" />
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
      </div>
      <hr />
      <ProductsTable {...productTableData} />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>

    </div>
  );
};

export default PurchaseForm;

