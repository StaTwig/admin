import React from "react";
import "./style.scss";
import Checked from "../../../assets/icons/checked.svg";
import Cross from "../../../assets/icons/cancel.svg";

const AlertModal = (props) => {
  const { t } = props;
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        {props.type === "Success" ? (
          <img
            src={Checked}
            width='60'
            height='60'
            className='mb-3'
            alt='Sucess'
          />
        ) : (
          <img
            src={Cross}
            width='60'
            height='60'
            className='mb-3'
            alt='Failed'
          />
        )}
        <div className='alert'>{props.type}</div>
        <div className='data'>{t('your')} {t('shipping_order')}</div>
        {props.type === "Success" ? (
          <div className='data mb-3'>{t('created')} {t('successfully')}</div>
        ) : (
          <div className='data mb-3'>{t("was_cancelled")}</div>
        )}
        <button className='btn-primary btn' onClick={props.onHide}>
        {t('ok')}
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
