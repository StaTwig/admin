import React, { useState } from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";
import Cross from "../../assets/icons/crossRed.svg";

const InventoryPopUp = ({ successMessage, errorMessage, onHide, t }) => {
  const imagePath = successMessage ? Checked : Cross;
  console.log("errorMessage ",errorMessage);
  return (
    <div className='inventorypopup'>
      <div className='d-flex  flex-column align-items-center'>
        <img
          src={imagePath}
          width='60'
          height='60'
          className='mb-3'
          alt='Alert'
        />
        <div className='alert'>
          {successMessage && `${t("success")}!`}
          {errorMessage && t("Failure")}
        </div>
        <div className='data'>{successMessage && t("successfully")}</div>
        <div className='data mb-4'>
          {successMessage && `${t("Added_to_inventory")}!`}
          {errorMessage && t(errorMessage)}
        </div>
        <button className='btn-primary btn' onClick={onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default InventoryPopUp;
