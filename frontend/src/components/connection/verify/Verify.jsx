import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function Verify() {
  return (
    <section className="account-section">
      <div className="vl-verify-container">
        <form action="" className="account-form-container">
          <hgroup className="form-headers">
            <h1 className="vl-heading f-700 vl-black">Verify your Account</h1>
            <h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm f-500-sm">
              We have sent the access code to your Email/ Phone Number, please
              check and verify
            </h2>
          </hgroup>
          <section className="vl-input-group form-auto-fill-section">
            <div className="input-otp-column">
              <TextField
                className="vl-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="vl-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="vl-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="vl-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="vl-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
            </div>
          </section>
          <section className="call-by-action">
            <button className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
              Verify
            </button>
          </section>
          <section className="further-links vl-justify-auto">
            <p className="vl-note vl-grey-xs f-400">
              Didn’t recieve the access code ?{" "}
              <Link to="/" className="vl-blue vl-link">
                Resend
              </Link>
            </p>
          </section>
        </form>
      </div>
    </section>
  );
}
