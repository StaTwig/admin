import React, { useState } from "react";
import './style.scss';
import Checked from "../../assets/icons/checked.svg";
const ReviewOrderPopUp = (props) => {
  
  return (
    <div className="inventorypopup">
      <div className="d-flex  flex-column align-items-center">
        <img src={Checked} width='60' height='60' className="mb-3" />
        <div className="alert" >
          Success!
        </div>
        <div className="data">
        The New Order has been Created
        </div>
        <div className="data mb-4">
            Successfully!
        </div>
        <button className="btn-primary btn" onClick={props.onHide}>OK</button>
      </div>
    </div>
  );
};

export default ReviewOrderPopUp;


