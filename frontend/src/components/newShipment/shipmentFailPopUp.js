import React from "react";
import './style.scss';
import Cancel from "../../assets/icons/cancel.svg";


const ShipmentFailPopUp = (props) => {
  return (
    <div className="inventorypopup">
      <div className="d-flex  flex-column align-items-center">
        <img src={Cancel} width='60' height='60' className="mb-3" />
        <div className="alert" >
          Fail!
        </div>
        <div className="data">
  <span className="font-weight-bolder">{props.shipmentError}</span> can't be Empty
        </div>
        <div className="data mb-4">
         Please Try Again
        </div>
        <button className="btn-primary btn" onClick={props.onHide}>TRY AGAIN</button>
      </div>

    </div>
  );
};

export default ShipmentFailPopUp;


