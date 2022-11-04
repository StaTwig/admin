import { TextField } from "@mui/material";
import React from "react";
import "./ScanBatch.css";
import ScanImage from "../../../assets/files/designs/scan.jpg";

export default function ScanBatch({ setSteps }) {
  return (
    <div className="ScanBatch--container">
      <div className="ScanBatch--inner-wrapper">
        <div className="ScanBatch--Image-space">
          <img src={ScanImage} alt="ScanImage" />
        </div>
        <div className="ScanBatch--Batch-form">
          <h1 className="vl-subheading f-500 vl-black">
            Enter the Batch Number
          </h1>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="XXXX XXXX XXXX"
          />
          <div className="ScanBatch--action">
            <button
              type="submit"
              className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
              onClick={() => setSteps(2)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
