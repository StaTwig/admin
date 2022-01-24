import React from "react";
import "./styles.scss";
import Checked from "../../assets/icons/waiting.png";

const SuccessPopUp = (props) => {
  const { t } = props;

  return (
    <div className='popup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='90'
          height='90'
          className='mb-3'
          alt={t('Success')}
        />
        <div className='alert'>{t('Success')}!</div>
        <div className='text-center'>
          <b>{t('Request_Successfully_Sent_for_Approval')}</b>
        </div>
        <div className='data'>{t(props.message)}</div>
        <button
          className='btn-primary btn w-25 mb-5 mt-4'
          onClick={props.onHide}
        >
          {t('OK')}
        </button>
      </div>
    </div>
  );
};

export default SuccessPopUp;
