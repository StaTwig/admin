import React from "react";
import Checked from "../../../assets/icons/checked.svg";
import Cross from "../../../assets/icons/crossRed.svg";

const SuccessPopup = ({ successMessage, errorMessage, onHide }) => {
  const imagePath = successMessage ? Checked : Cross;

  return (
    <div className="inventorypopup">
      <div className="d-flex  flex-column align-items-center">
        <img
          src={imagePath}
          width="60"
          height="60"
          className="mb-3"
          alt="Alert"
        />
        <div className="alert">
          {successMessage && `Success`}
          {errorMessage && `Failure`}
        </div>
        <div className="data mb-4">
          {successMessage && successMessage}
          {errorMessage && errorMessage}
        </div>
        <button className="btn-primary btn" onClick={onHide}>
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
