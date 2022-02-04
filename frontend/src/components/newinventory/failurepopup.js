import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/cancel.svg";

const FailurePopUp = (props) => {
  const {t} = props;
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img src={Checked} width='60' height='60' className='mb-3' alt='' />
        <div className='alert'>{t('fail')}!</div>
        <div className='font-weight-bolder error'>
          ' {t(props.inventoryError)} '
        </div>
        <div className='data'>
          {" "}
          {props.inventoryError === "Check expiryDate" || "all_products_are_expired" || "Product Doesn't exist in the inventory."
            ? null
            : "cannot be Empty"}
        </div>
        <div className='data mb-3'>{t('please') + " " + t('try_again')}</div>
        <button className='btn-primary btn' onClick={props.onHide}>
        {t('try_again')}
        </button>
      </div>
    </div>
  );
};

export default FailurePopUp;
