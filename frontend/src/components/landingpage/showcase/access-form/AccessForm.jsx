import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import GoogleIcon from "../../../../assets/files/images/social/google.png";
import TorusIcon from "../../../../assets/files/images/social/torus.png";
import "./AccessForm.css";
import { Link } from "react-router-dom";

export default function AccessForm() {
  const [EmailPhone, setEmailPhone] = useState("email");
  return (
    <div className="connect-popup-container">
      <div className="auto-connect-options">
        <div
          className="login-button-card"
          // onClick={() => {
          //   Navigate("/register/account", { replace: true });
          // }}
        >
          <div className="icon-space">
            <img src={GoogleIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">Sign In with Google</p>
        </div>
        <div
          className="login-button-card"
          // onClick={() => {
          //   Navigate("/register/organization", { replace: true });
          // }}
        >
          <div className="icon-space">
            <img src={TorusIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">Sign In with Wallet ID</p>
        </div>
      </div>
      <div className="option-divider">
        <div className="divider-bar"></div>
        <p className="vl-subheading vl-grey-xs">OR</p>
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
              className="vl-flex vl-align-center vl-gap-xs vl-blue vl-link"
              onClick={() => setEmailPhone("phone")}
            >
              <i className="fa-solid fa-phone vl-icon-xs"></i>
              <p className="vl-note">Use Phone Number</p>
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
              className="vl-flex vl-align-center vl-gap-xs vl-blue  vl-link"
              onClick={() => setEmailPhone("email")}
            >
              <i className="fa-solid fa-envelope vl-icon-xs"></i>
              <p className="vl-note vl-link">Use Email Address</p>
            </div>
          </div>
        </div>
      )}

      <div className="popup-actions">
        <button
          className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
          // onClick={() => {
          //   Navigate("/register/verify", { replace: true });
          // }}
        >
          Sign In
        </button>
      </div>
      <section className="further-links vl-justify-auto">
        <p className="vl-note vl-grey-xs f-400">
          Don't have Account?{" "}
          <Link to="/" className="vl-blue vl-link">
            Create Account
          </Link>
        </p>
      </section>
    </div>
  );
}
