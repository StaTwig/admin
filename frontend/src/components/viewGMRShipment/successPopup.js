import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";

const SuccessPopup = (props) => {
  const { t } = props;
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
        <div className='alert'>{t('success')}!</div>
        <div className='data'>{t("your")} {t("shipment")}</div>
        <div className='data mb-4'>{t("delivered")} {t('successfully')}!</div>
        <button className='btn-primary btn' onClick={props.onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
