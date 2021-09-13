import React, { useState } from "react";
import './style.scss';
import Checked from "../../assets/icons/cancel.svg";


const FailurePopUp = (props) => {
  return (
    <div className="inventorypopup">
      <div className="d-flex  flex-column align-items-center">
        <img src={Checked} width='60' height='60' className="mb-3" alt = "" />
        <div className="alert" > Fail!</div>
        <div className="font-weight-bolder error">' {props.inventoryError} '</div>
        <div className="data"> {props.inventoryError == 'Check expiryDate'? null: "cannot be Empty"}</div>
        <div className="data mb-3"> Please try again</div>
        <button className="btn-primary btn" onClick={props.onHide}>TRY AGAIN</button>
      </div>

    </div>
  );
};

export default FailurePopUp;


