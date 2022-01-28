import React from "react";
import "./style.scss";
import Cancel from "../../assets/icons/cancel.svg";

const FailPopup = (props) => {
  const {t} = props;
  return (
    <div className='shipmentpopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Cancel}
          width='60'
          height='60'
          className='mb-3'
          alt='Cancel'
        />
        <div className='alert font-weight-bolder'>{t('fail')}!</div>
        <div className='data mb-3'> {t('please') + " " + t('try_again')} </div>
        <button className='btn-primary btn' onClick={props.onHide}>
        {t('try_again')}
        </button>
      </div>
    </div>
  );
};

export default FailPopup;
