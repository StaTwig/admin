import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";
const ReviewOrderPopUp = (props) => {
  const { t } = props;
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Checked'
        />
        <div className='alert'>
          <b> {t('success')}!</b>
        </div>
        <div className='data'>{t('order_success')}</div>
        <div className='data mb-4'>{t('successfully')}!</div>
        <div className='data mb-4'>
          {t('order_id')}-<b>{props.OrderId}</b>
        </div>
        <button className='btn-primary btn' onClick={props.onHide}>
          {t('ok')}
        </button>
      </div>
    </div>
  );
};

export default ReviewOrderPopUp;
