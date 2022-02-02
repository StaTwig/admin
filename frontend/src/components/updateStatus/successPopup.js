import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";

const SuccessPopup = (props) => {
  const {t} = props
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Success'
        />
        <div className='alert'>{t("success")}!</div>
        <div className='data'>{t('Your_Shipment_Status_has_been')}</div>
        <div className='data mb-4'>{t('updated_successfully')}!</div>
        <button className='btn-primary btn' onClick={props.onHide}>
        {t("ok")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
