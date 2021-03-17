import React from "react";
import admin from "../../assets/admin.png";
import userIcon from "../../assets/user.png";

const Selection = (props) => {
  const {
    setButtonActive,
    setContinueClick,
    buttonActive,
    continueClick,
    setSteps,
  } = props;
  return (
    <div className="alignCenter">
      <div className="row justify-content-center">
        <h2 className="bold">Welcome</h2>
      </div>
      <div className="pb-4 row justify-content-center">
        <h6>Select Your Role</h6>
      </div>
      <div className="row justify-content-center">
        <button
          onClick={() => setButtonActive(1)}
          className={`mr-5 cursorP rounded pt-3 pb-3 pl-5 pr-5 col containerC ${
            buttonActive == 1 ? "btn-active" : ""
          }`}
        >
          <img src={admin} width={60} />
          <p className="pt-3 mb-0 text-dark"> Admin</p>
        </button>
        <button
          onClick={() => setButtonActive(2)}
          className={`col cursorP rounded ml-5 pt-3 pb-3 pl-5 pr-5 containerC ${
            buttonActive == 2 ? "btn-active" : ""
          }`}
        >
          <img src={userIcon} width={60} />
          <p className="pt-3 mb-0 text-dark"> User</p>
        </button>
      </div>
      <div className="row pt-5 justify-content-center">
        <button
          onClick={() => {
            setContinueClick(true);
            setSteps(2);
          }}
          className={`btn ${buttonActive > 0 ? `btn-red` : ``}`}
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Selection;
