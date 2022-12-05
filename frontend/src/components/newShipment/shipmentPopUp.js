import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";

const ShipmentPopUp = (props) => {
  const { t } = props;
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Shipment'
        />
        <div className='alert'>{t('success')}!</div>
        <div className='data'>
          {t('your')} {t('shipments')}
          <span className='bold ml-3'>{props.id}</span>
        </div>
        <div className='data mb-4'>{t('assigned_successfully')}!</div>
        <button className='btn-primary btn' onClick={props.onHide}>
          {t('ok')}
        </button>
      </div>
    </div>
  );
};

export default ShipmentPopUp;
