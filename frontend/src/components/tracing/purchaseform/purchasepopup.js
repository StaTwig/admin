import React from 'react';
import ProductsTable from './products';
import './style.scss';

const PurchasePopUp = (props) => {
const tableHeader = ['Material ID', 'Manufacturer','Product Name', 'Quantity'];
const productData = props.shipments;
return (
    <div className="purchaseform">
        <p className="date-alignment">Date: {props.shipments.poTxns[props.shipments.poTxns.length-1].date}</p>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">Send PO To</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].sendpoto.name}
          />
        </div>
         <div className="input-group">
          <label className="reference">Vendor Id</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].vendor}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">

      <div className="input-group">
      <label className="reference">Purchase Order ID</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].orderID}
          />
        </div>
       <div className="input-group">
          <label className="reference">Vendor Name</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].vendorName}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
      <div className="input-group">
          <label className="reference">PO Item#</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].poItem}
          />
        </div>
        <div className="input-group">
          <label className="reference">To Location ID</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].plant}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label className="reference">Shipped From</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].supplierLocation}
          />
        </div>
        <div className="input-group">
          <label className="reference">To Location</label>
          <input
            disabled
            type="text"
            className="form-control"
            value={props.shipments.poTxns[props.shipments.poTxns.length-1].destination}
          />
        </div>
      </div>
      <ProductsTable
        tableHeader={tableHeader}
        productData = {productData}
     
      />
      
      </div>

      
  );
};

export default PurchasePopUp;
