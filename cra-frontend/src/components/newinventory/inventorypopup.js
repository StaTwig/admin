import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";

const InventoryPopUp = (props) => {
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
        <div className='alert'>Success!</div>
        <div className='data'>Your Inventory has been</div>
        <div className='data mb-4'>added Successfully!</div>
        <button className='btn-primary btn' onClick={props.onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default InventoryPopUp;
