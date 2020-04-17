import React from "react";
import Pen from "../../assets/icons/pen.svg";
import './style.scss';

const VerifyShipment = () => {
  return (
    <div className="verifyshipment">
     <div className="d-flex flex-row justify-content-between">
      <h1 className="breadcrumb">VERIFY SHIPMENTS</h1>
      <button type="button" className="btn btn-outline-info">Export</button>
      </div>
    <div className="card">
            <div className="card-body">
            <h5>Shipment Details</h5>
            <div className="d-flex flex-row">
            <div className="row mr-auto">
             <ul>
             <li>Shipment Number</li>
             <li>Client Name</li>
             </ul>
              <ul>
             <li>YU53673736ffg</li>
             <li>UNICEF</li>
             </ul>
             </div>
         <div className="row mr-auto">
             <ul>
             <li>Supplier</li>
             <li>SupplierLocation</li>
             <li>SupplierDate</li>
             </ul>
             <ul>
             <li>John Doe</li>
             <li>Location ABC</li>
             <li>01/03/2020</li>
             </ul>
             </div>
          <div className="row mr-auto">
             <ul>
             <li>Delivery To</li>
             <li>Delivery Location</li>
             <li>Delivery Date</li>
            </ul>
             <ul>
             <li>ABC Ltd</li>
             <li>Location ABC</li>
             <li>05/03/2020</li>
             </ul>
             </div>
             </div>
         <h5>Description Of Goods </h5>
         <div className="d-flex flex-row justify-content-between">
              <ul>
             <li>Product Name</li>
             <li>Product Type</li>
             <li>Product Type</li>
             <li>Product Type</li>
             </ul>
             <ul>
             <li>Manufacturer</li>
             <li>Manufacturer</li>
             <li>Manufacturer</li>
             <li>Manufacturer</li>
              </ul>
             <ul>
             <li>Quantity</li>
             <li> 3000</li>
             <li>1567</li>
             <li>2020</li>
             </ul>
             <ul>
             <li>Manufacturer Date</li>
             <li>05/03/2020</li>
             <li>05/03/2020</li>
             <li>05/03/2020</li>
             </ul>
             <ul>
             <li>Expiry Date</li>
             <li>05/03/2023</li>
             <li>05/03/2023</li>
             <li>05/03/2023</li>
             </ul>
             <ul>
             <li>Batch Number</li>
             <li>Batch Number</li>
             <li>Batch Number</li>
             <li>Batch Number</li>
             </ul>
             <ul>
             <li>Serial Numbers Range</li>
             <li>Serial Numbers</li>
             <li>Serial Numbers</li>
             <li>Serial Numbers</li>
             </ul>
          </div>
          <hr />
      <div className="d-flex justify-content-between">
      <div className="total">Total</div>
      <div className="value">Quantity</div>
      <div className="d-flex flex-row">
         <button className="btn-primary btn"><img src={Pen} width='15' height='15' className="mr-3" />
                               <span>EDIT</span>
                                   </button>
      <button className="btn-primary btn">Verify & Receive</button>
      </div>
      </div>
    </div>
    </div>
    </div>
   
   
  );
};

export default VerifyShipment;

