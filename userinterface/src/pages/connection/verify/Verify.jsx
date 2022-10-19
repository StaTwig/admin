import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function Verify() {
  return (
    <section className="account-section">
      <div className="mi-verify-container">
        <form action="" className="account-form-container">
          <hgroup className="form-headers">
            <h1 className="mi-heading f-700 mi-black">Verify your Account</h1>
            <h2 className="mi-subheading f-400 mi-grey-xs mi-line-sm f-500-sm">
              We have sent the access code to your Email/ Phone Number, please
              check and verify
            </h2>
          </hgroup>
          <section className="mi-input-group form-auto-fill-section">
            <div className="input-otp-column">
              <TextField
                className="mi-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="mi-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="mi-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="mi-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
              <TextField
                className="mi-custom-textfield"
                fullWidth
                variant="outlined"
                placeholder="*"
                inputProps={{ maxLength: 1 }}
              />
            </div>
          </section>
          <section className="call-by-action">
            <button className="mi-btn mi-btn-md mi-btn-full mi-btn-primary">
              Verify
            </button>
          </section>
          <section className="further-links mi-justify-auto">
            <p className="mi-note mi-grey-xs f-400">
              Didn’t recieve the access code ?{" "}
              <Link to="/" className="mi-blue mi-link">
                Resend
              </Link>
            </p>
          </section>
        </form>
      </div>
    </section>
  );
}
