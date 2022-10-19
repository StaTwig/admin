import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import GoogleIcon from "../../../../assests/files/images/social/google.png";
import TorusIcon from "../../../../assests/files/images/social/torus.png";
import "./AccessForm.css";
import { useNavigate } from "react-router-dom";

export default function AccessForm() {
  const [EmailPhone, setEmailPhone] = useState("email");
  const Navigate = useNavigate();
  return (
    <div className="connect-popup-container">
      <div className="auto-connect-options">
        <div
          className="login-button-card"
          onClick={() => {
            Navigate("/register/account", { replace: true });
          }}
        >
          <div className="icon-space">
            <img src={GoogleIcon} alt="social" />
          </div>
          <p className="mi-subheading f-500 no-space">Connect with Google</p>
        </div>
        <div
          className="login-button-card"
          onClick={() => {
            Navigate("/register/organization", { replace: true });
          }}
        >
          <div className="icon-space">
            <img src={TorusIcon} alt="social" />
          </div>
          <p className="mi-subheading f-500 no-space">Connect with Wallet ID</p>
        </div>
      </div>
      <div className="option-divider">
        <div className="divider-bar"></div>
        <p className="mi-subheading mi-grey-xs">OR</p>
        <div className="divider-bar"></div>
      </div>
      {EmailPhone === "email" ? (
        <div className="manual-connect-options">
          <div className="input-space-holder">
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="change-input-option">
            <div
              className="mi-flex mi-align-center mi-gap-xs mi-blue mi-link"
              onClick={() => setEmailPhone("phone")}
            >
              <i className="fa-solid fa-phone mi-icon-xs"></i>
              <p className="mi-note">Use Phone Number</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="manual-connect-options">
          <div className="input-space-holder">
            <TextField
              id="outlined-basic"
              label="Phone Numer"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="change-input-option">
            <div
              className="mi-flex mi-align-center mi-gap-xs mi-blue  mi-link"
              onClick={() => setEmailPhone("email")}
            >
              <i className="fa-solid fa-envelope mi-icon-xs"></i>
              <p className="mi-note mi-link">Use Email Address</p>
            </div>
          </div>
        </div>
      )}

      <div className="popup-actions">
        <button
          className="mi-btn mi-btn-md mi-btn-full mi-btn-primary"
          onClick={() => {
            Navigate("/register/verify", { replace: true });
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
