import React from "react";
import "./styles.scss";
// import Checked from "../../assets/icons/checked.svg";

const SuccessPopUp = (props) => {
  return (
    <div className="popup">
      <div className="d-flex  flex-column align-items-center">
        {/* <img src={Checked} width="60" height="60" className="mb-3" /> */}
        <div className="alert">Success!</div>
        <div className="data">{props.message}</div>
        <button
          className="btn-primary btn w-25 mb-5 mt-4"
          onClick={props.onHide}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopUp;
