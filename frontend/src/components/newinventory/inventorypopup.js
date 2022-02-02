import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";

const InventoryPopUp = (props) => {
  const {t} = props;
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Alert'
        />
        <div className='alert'>{t('success')}!</div>
        <div className='data'>{t('your')} {t('inventory') }{t('has_been') }</div>
        <div className='data mb-4'>{t('added_successfully')}!</div>
        <button className='btn-primary btn' onClick={props.onHide}>
        {t('ok')}
        </button>
      </div>
    </div>
  );
};

export default InventoryPopUp;
