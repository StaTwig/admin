import React from "react";
import TextField from "@mui/material/TextField";

import "./Contact.css";

export default function Contact({ handleClose }) {
  return (
    <section className="contact-form">
      <div className="popup-close-icon" onClick={handleClose}>
        <i className="fa-solid fa-times mi-body"></i>
      </div>
      <hgroup className="form-headers-popup ">
        <h1 className="mi-subtitle f-700 mi-black">Let's Connect</h1>
        <h2 className="mi-body f-400 mi-grey-xs mi-line-sm">
          Our team will contact you very soon, Thankyou
        </h2>
      </hgroup>
      <article className="mi-input-group">
        <div className="input-full-space">
          <TextField fullWidth variant="outlined" label="First Name" />
        </div>
        <div className="input-full-space">
          <TextField fullWidth variant="outlined" label="Business E-mail" />
        </div>
        <div className="input-full-space">
          <TextField fullWidth variant="outlined" label="Company Name" />
        </div>
        <div className="input-full-space">
          <TextField fullWidth variant="outlined" label="Phone Number" />
        </div>
        <div className="input-full-space">
          <TextField fullWidth variant="outlined" label="Designation" />
        </div>
        <div className="input-full-space">
          <TextField
            fullWidth
            variant="outlined"
            label="Software application"
          />
        </div>
        <div className="input-full-space">
          <TextField fullWidth variant="outlined" label="No. of employees" />
        </div>
        <section className="call-by-action">
          <button className="mi-btn mi-btn-md mi-btn-full mi-btn-primary">
            Submit
          </button>
        </section>
      </article>
    </section>
  );
}
