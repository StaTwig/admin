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
    <div className='selectUserSection'>
      <div className='align-center pb-5 pt-5'>
        <h2 className='titleHeading'>Welcome</h2>
        <span className='titleSubHeading'>Select Your Role</span>
      </div>
      <div>
        <button
          onClick={() => setButtonActive(1)}
          className={`cursorP selectionUserContainer mr-selectUser ${
            buttonActive == 1 ? "btn-active" : ""
          }`}
        >
          <img src={admin} width={60} />
          <p className='pt-3 mb-0 text-dark'> Admin</p>
        </button>

        <button
          onClick={() => setButtonActive(2)}
          className={`cursorP selectionUserContainer ml-selectUser ${
            buttonActive == 2 ? "btn-active" : ""
          }`}
        >
          <img src={userIcon} width={60} />
          <p className='pt-3 mb-0 text-dark'> User</p>
        </button>
      </div>
      <div className='align-center pt-5'>
        <button
          onClick={() => {
            if (buttonActive == 1) {
              const url = window.location.href;
              if (url.indexOf("test") !== -1) {
                window.location = "https://test.admin.abinbev.statledger.io/";
              } else if (url.indexOf("abinbev.statledger.io") !== -1) {
                window.location = "https://admin.abinbev.statledger.io/";
              } else {
                window.location = "http://localhost:3001/";
              }
            } else {
              setContinueClick(true);
              setSteps(2);
            }
          }}
          className={`btn ${buttonActive > 0 ? `btn-red` : ``}`}
          type='button'
        >
          Continue
        </button>
      </div>
      <div className='col text-center footer-logo'>
        <img src={logo} width={60} />
      </div>
    </div>
  );
};

export default Selection;
