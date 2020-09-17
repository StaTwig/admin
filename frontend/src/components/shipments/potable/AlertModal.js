import React, { useState } from 'react';
import './style.scss';
import Checked from '../../../assets/icons/checked.svg';
import Cross from '../../../assets/icons/cross.svg';

const AlertModal = props => {
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
          Your PurchaseOrder status changed <span className="bold">{props.productID}</span>
        </div>
        <button className="btn-primary btn" onClick={props.onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
