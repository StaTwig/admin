import React from "react";
import "./style.scss";
import Checked from "../../assets/icons/checked.svg";
import Cross from "../../assets/icons/crossRed.svg";

const InventoryPopUp = ({ successMessage, errorMessage, onHide, t }) => {
  const imagePath = successMessage ? Checked : Cross;

  const errMsgTrans = () => {
    const msgArr = errorMessage.split(" ");
    const firstFiveWord = msgArr.slice(0, 5).join(" ");
    if (firstFiveWord === "A batch with batch number") {
      const word = `${t(firstFiveWord)} ${msgArr.slice(5, 6)} ${t(msgArr.slice(6, msgArr.length).join(" "))}`
      return word;
    } else if (errorMessage === "Validation Error") {
      return t(errorMessage)
    }
    return errorMessage
  }

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
          {errorMessage && `${t("Failure")}`}
        </div>
        <div className='data'>{successMessage && t("successfully")}</div>
        <div className='data mb-4'>
          {successMessage && `${t("Added_to_inventory")}!`}
          {errorMessage && errMsgTrans()}
        </div>
        <button className='btn-primary btn' onClick={onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default InventoryPopUp;
