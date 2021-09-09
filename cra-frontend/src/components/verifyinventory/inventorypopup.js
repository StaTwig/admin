import React, { useState } from "react";
import './style.scss';
import Checked from "../../assets/icons/checked.svg";
import Cross from '../../assets/icons/crossRed.svg'

const InventoryPopUp = ({successMessage, errorMessage, onHide}) => {
  const imagePath = successMessage ? Checked : Cross;
  return (
    <div className="inventorypopup">
      <div className="d-flex  flex-column align-items-center">
        <img src={imagePath} width='60' height='60' className="mb-3" />
        <div className="alert" >
          {successMessage && 'Success!'}
          {errorMessage && 'Failure'}
        </div>
        <div className="data">
          {successMessage && 'Successfully '}
        </div>
        <div className="data mb-4">
          {successMessage &&  'added to inventory!'}
          {errorMessage &&  errorMessage}
        </div>
        <button className="btn-primary btn" onClick={onHide}>OK</button>
      </div>

    </div>
  );
};

export default InventoryPopUp;


