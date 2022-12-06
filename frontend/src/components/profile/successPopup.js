import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";

const SuccessPopUp = (props) => {
  const { t } = props;
  return (
    <div className='profilepopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={Checked}
          width='60'
          height='60'
          className='mb-3'
          alt='Success'
        />
        <div className='alert'>{t('success')}!</div>
        <div className='data'>Your Profile has been</div>
        <div className='data mb-4'>Saved Successfully!</div>
        <button className='btn-primary btn' onClick={props.onHide}>
        {t("ok")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPopUp;
