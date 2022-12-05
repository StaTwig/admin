import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AssignRole({ handleClose2 }) {
  const options = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
  ];
  return (
    <div className="addOrganization-container">
      <div className="addorganization-header">
        <p className="vl-subheading f-500 vl-blue">Assign Role</p>
        <i className="fa-solid fa-xmark" onClick={handleClose2}></i>
      </div>
      <div className="addorganization-body">
        <div className="input-set">
          <p className="vl-body f-500 vl-black">
            Enter the email address of the users you'd like to add or invite and
            choose the role they should have.
          </p>
          <div className="input-two-column-space">
            <TextField fullWidth variant="outlined" label="Email Address" />
            <TextField fullWidth variant="outlined" label="Phone Number" />
          </div>
        </div>
        <div className="input-set">
          <p className="vl-body f-500 vl-black">Assign the Role Here</p>
          <div className="input-full-space">
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Assign Role" />
              )}
            />
          </div>
        </div>
      </div>
      <div className="addorganization-actions">
        <button className="vl-btn vl-btn-sm vl-btn-primary">
          Assign the Role
        </button>
      </div>
    </div>
  );
}
