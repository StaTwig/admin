import React from "react";
import admin from "../../assets/admin.png";
import userIcon from "../../assets/user.png";
import logo from "../../assets/ABInBev.png";
import "./style.scss";

const Selection = (props) => {
  const {
    setButtonActive,
    setContinueClick,
    buttonActive,
    continueClick,
    setSteps,
  } = props;
  return (
    <div className="selectUserSection">
      <div className="align-center pb-5 pt-5">
        <h2 className="titleHeading">Welcome</h2>
        <span className="titleSubHeading">Select Your Role</span>
      </div>
      <div >
        <button
          onClick={() => setButtonActive(1)}
          className={`cursorP selectionUserContainer mr-selectUser ${
            buttonActive == 1 ? "btn-active" : ""
          }`}
        >
          <img src={admin} width={60} />
          <p className="pt-3 mb-0 text-dark"> Admin</p>
        </button>

        <button
          onClick={() => setButtonActive(2)}
          className={`cursorP selectionUserContainer ml-selectUser ${
            buttonActive == 2 ? "btn-active" : ""
          }`}
        >
          <img src={userIcon} width={60} />
          <p className="pt-3 mb-0 text-dark"> User</p>
        </button>

      </div>
      <div className="align-center pt-5">
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
      <div className="col text-center footer-logo">
        <div className="foodledgerLogo">
          <span className="logo1">FOOD</span> <span className="logo2">LEDGER</span>
        </div>
      </div>
    </div>
  );
};

export default Selection;
