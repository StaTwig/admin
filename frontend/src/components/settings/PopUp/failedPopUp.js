import React from "react";
import "./styles.scss";
import Checked from "../../assets/icons/cancel.svg";

const FailedPopUp = (props) => {
  return (
    <div className='popup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Failed'
        />
        <div className='alert font-weight-bolder'> Fail!</div>
        <div className='data mb-3'>{props.message}</div>
        <button className='btn-primary btn mb-5' onClick={props.onHide}>
          TRY AGAIN
        </button>
      </div>
    </div>
  );
};

export default FailedPopUp;
