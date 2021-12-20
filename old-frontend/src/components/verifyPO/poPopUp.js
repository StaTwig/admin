import React, { useState } from 'react';
import './style.scss';
import Checked from '../../assets/icons/checked.svg';
import Cross from '../../assets/icons/cross.svg';

const PoPopUp = props => {
  return (
    <div className="inventorypopup">
      <div className="d-flex  flex-column align-items-center">
        {props.type === 'Success' ? (
          <img src={Checked} width="60" height="60" className="mb-3" />
        ) : (
          <img src={Cross} width="60" height="60" className="mb-3" />
        )}
        <div className="alert">{props.type}</div>
        <div className="data">
          Your PurchaseOrder <span className="bold">{props.productId}</span>
        </div>
        <div className="data mb-4">{props.message}</div>
        <button className="btn-primary btn" onClick={props.onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PoPopUp;
