import { TextField } from "@mui/material";
import React from "react";

export default function AddRole({ handleClose }) {
  return (
    <div className="addOrganization-container">
      <div className="addorganization-header">
        <p className="vl-subheading f-500 vl-blue">Add Organization</p>
        <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      </div>
      <div className="addorganization-body">
        <div className="input-set">
          <p className="vl-body f-500 vl-black">
            Enter the Name of the New Role
          </p>
          <div className="input-full-space">
            <TextField fullWidth variant="outlined" label="User Role" />
          </div>
        </div>
      </div>
      <div className="addorganization-actions">
        <button className="vl-btn vl-btn-sm vl-btn-primary">Save</button>
      </div>
    </div>
  );
}
