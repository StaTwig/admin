import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import "./AddOrganization.css";

export default function AddOrganization({ handleClose }) {
  const options = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
  ];
  return (
    <div className="addOrganization-container">
      <div className="addorganization-header">
        <p className="vl-subheading f-500 vl-blue">Add Organization</p>
        <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      </div>
      <div className="addorganization-body">
        <div className="input-set">
          <p className="vl-body f-500 vl-black">Personal detail</p>
          <div className="input-two-column-space">
            <TextField fullWidth variant="outlined" label="First Name" />
            <TextField fullWidth variant="outlined" label="Last Name" />
          </div>
          <div className="input-two-column-space">
            <TextField fullWidth variant="outlined" label="Email Address" />
            <TextField fullWidth variant="outlined" label="Phone Number" />
          </div>
        </div>
        <div className="input-set">
          <p className="vl-body f-500 vl-black">Organization details</p>
          <div className="input-two-column-space">
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Organization Type" />
              )}
            />
            <TextField fullWidth variant="outlined" label="Organization Name" />
          </div>
          <div className="input-two-column-space">
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={options}
              renderInput={(params) => <TextField {...params} label="Region" />}
            />
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
          </div>
          <div className="input-two-column-space">
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={options}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
            <TextField fullWidth variant="outlined" label="Pin" />
          </div>
          <div className="input-single-column-space">
            <TextField fullWidth multiline variant="outlined" label="Address" />
          </div>
        </div>
      </div>
      <div className="addorganization-actions">
        <button className="vl-btn vl-btn-sm vl-btn-primary">Register</button>
      </div>
    </div>
  );
}
