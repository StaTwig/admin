import React from "react";
import "./styles.scss";
import Checked from "../../../assets/icons/checked.svg";

const SuccessPopUp = (props) => {
  const {t} = props;
  return (
    <div className='popup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='90'
          height='90'
          className='mb-3'
          alt='Sucess'
        />
        <div className='alert'>{t('success')}!</div>
        <div className='text-center'>
          <b>{t('alerts')} {t('successfully')}{t('created')}</b>
        </div>
        <div className='data'>{props.message}</div>
        <button
          className='btn-primary btn w-25 mb-5 mt-4'
          onClick={props.onHide}
        >
          {t("ok")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPopUp;
