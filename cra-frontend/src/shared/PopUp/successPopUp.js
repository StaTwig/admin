import React from "react";
import "./styles.scss";
import Checked from "../../assets/icons/waiting.png";

const SuccessPopUp = (props) => {
  return (
    <div className='popup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='90'
          height='90'
          className='mb-3'
          alt='Success'
        />
        <div className='alert'>Success!</div>
        <div className='text-center'>
          <b>Request Successfully Sent for Approval</b>
        </div>
        <div className='data'>{props.message}</div>
        <button
          className='btn-primary btn w-25 mb-5 mt-4'
          onClick={props.onHide}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopUp;
