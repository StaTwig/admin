import React from "react";
import './style.scss';

const VerifyShipment = () => {
  return (
    <div className="verifyshipment">
      <h1 className="breadcrumb">VERIFY SHIPMENTS</h1>
      <hr />
      
      <div className="d-flex justify-content-between">
      <div className="total">Total</div>
      <div className="value">Quantity</div>
      <div className="d-flex ">
      <button className="btn-primary btn">Edit</button>
      <button className="btn-primary btn">Verify & Receive</button>
      </div>
      </div>
    </div>
   
  );
};

export default VerifyShipment;

