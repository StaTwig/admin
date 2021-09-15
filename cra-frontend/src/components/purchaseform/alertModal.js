import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";
import Cross from "../../assets/icons/cancel.svg";

const AlertModal = (props) => {
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        {props.type === "Success" ? (
          <img
            src={Checked}
            width='60'
            height='60'
            className='mb-3'
            alt='Checked'
          />
        ) : (
          <img src={Cross} width='60' height='60' className='mb-3' alt='Fail' />
        )}
        <div className='alert'>{props.type}</div>
        <div className='data'>Your Purchase Order</div>
        {props.type === "Success" ? (
          <div className='data mb-3'>Created Successfully</div>
        ) : (
          <div className='data mb-3'>Was Cancelled</div>
        )}
        <button className='btn-primary btn' onClick={props.onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
