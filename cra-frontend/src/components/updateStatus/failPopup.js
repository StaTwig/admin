import React from "react";
import './style.scss';
import Cancel from "../../assets/icons/cancel.svg";


const FailPopup = (props) => {
  return (
    <div className="shipmentpopup">
      <div className="d-flex  flex-column align-items-center">
        <img src={Cancel} width='60' height='60'className="mb-3" />
        <div className="alert font-weight-bolder"> Fail! </div>
        <div className="data mb-3"> Please Try Again </div>
        <button className="btn-primary btn" onClick={props.onHide}>TRY AGAIN</button>
      </div>

    </div>
  );
};

export default FailPopup;
