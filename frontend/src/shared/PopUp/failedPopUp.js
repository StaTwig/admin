import React from "react";
import "./styles.scss";
import Checked from "../../assets/icons/cancel.svg";

const FailedPopUp = (props) => {
  const { t, message, onHide } = props;

  return (
    <div className='popup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Checked'
        />
        <div className='alert font-weight-bolder'> {t("fail")}!</div>
        <div className='data mb-3 text-center'>{message}</div>
        <button className='btn-primary btn mb-5' onClick={onHide}>
          {t("try_again")}
        </button>
      </div>
    </div>
  );
};

export default FailedPopUp;
