import React from "react";
import { useState } from "react";
import "./Beneficiary.css";
import AddImage from "../../../assets/files/designs/add.jpg";
import { MenuItem, Select, TextField } from "@mui/material";

function ResultCard({ age, gender, variant }) {
  return (
    <div className={`Result-single-card result-variant-${variant}`}>
      <div className="more-action-btn">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <div className="result-stats">
        <h1 className="vl-title f-700 vl-black">Age: {age}</h1>
        <h2 className="vl-subheading f-500 vl-black">Gender : {gender}</h2>
      </div>
    </div>
  );
}

export default function Beneficiary({ setSteps }) {
  const [LayoutType, setLayoutType] = useState("1");
  const [Gender, setGender] = React.useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div className="Beneficiary--container">
      <div className="Beneficiary--inner-wrapper">
        <div className="Beneficiary--header">
          <h1 className="vl-subtitle f-700 vl-black">
            Register your Vaccination Details
          </h1>
          <button
            className="vl-btn vl-btn-sm vl-btn-primary"
            onClick={() => setLayoutType("2")}
          >
            <span>
              <i class="fa-solid fa-plus"></i>
            </span>{" "}
            Add Beneficary Detail
          </button>
        </div>
        <div className="Beneficiary--product">
          <div className="Beneficiary-product-card">
            <div className="Product-field-grid">
              <div className="field-header">
                <i class="fa-solid fa-vial-circle-check"></i>
                <p className="vl-body f-500 vl-blue">Product Name :</p>
              </div>
              <p className="vl-body f-500 vl-blue">Pfizer Vaccine</p>
            </div>
            <div className="Product-field-grid">
              <div className="field-header">
                <i class="fa-solid fa-building"></i>
                <p className="vl-body f-500 vl-blue">Manufacturer Name :</p>
              </div>
              <p className="vl-body f-500 vl-blue">Bharath Biotech</p>
            </div>
            <div className="batch-number">
              <p className="vl-note batch-number-label f-500">
                Batch No : 1234 5678
              </p>
            </div>
          </div>
        </div>
        <div className="Beneficiary--body">
          {LayoutType === "1" && (
            <section className="Beneficiary--Empty-wrapper">
              <div className="Beneficiary--Image-space">
                <img src={AddImage} alt="ScanImage" />
              </div>
              <h1 className="vl-note f-500 vl-black">
                Vaccinated List is Empty, Please Click Add button to Add the
                Details
              </h1>
            </section>
          )}

          {LayoutType === "2" && (
            <section className="Beneficiary--Add-wrapper">
              <div className="Beneficiary--Add-inner-wrapper">
                <h1 className="vl-subheading f-700 vl-grey-md">
                  Beneficiary Details
                </h1>
                <div className="Add-form-space">
                  {/* <Select value={Gender} label="Gender" onChange={handleChange}>
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                    <MenuItem value={30}>General</MenuItem>
                  </Select> */}
                  <TextField fullWidth variant="outlined" label="Gender" />
                  <TextField fullWidth variant="outlined" label="Age" />
                </div>
                <div className="Beneficiary--action">
                  <button
                    type="submit"
                    className="vl-btn vl-btn-md vl-btn-primary"
                    onClick={() => setLayoutType("3")}
                  >
                    Save
                  </button>
                </div>
              </div>
            </section>
          )}

          {LayoutType === "3" && (
            <section className="Beneficiary--Result-wrapper">
              <div className="Beneficiary--Result-inner-wrapper">
                <div className="Result-header">
                  <div className="Result-title-space">
                    <h1 className="vl-subheading f-700 vl-grey-md">
                      Vaccinated Overview
                    </h1>
                    <p className="vl-body card-number-label f-700">06</p>
                  </div>
                  <button
                    className="vl-btn vl-btn-sm vl-btn-primary"
                    onClick={() => setSteps(1)}
                  >
                    Complete
                  </button>
                </div>
                <div className="Result-body">
                  <ResultCard variant="1" age="29" gender="MALE" />
                  <ResultCard variant="2" age="23" gender="FEMALE" />
                  <ResultCard variant="3" age="35" gender="FEMALE" />
                  <ResultCard variant="4" age="21" gender="MALE" />
                  <ResultCard variant="5" age="22" gender="FEMALE" />
                  <ResultCard variant="6" age="30" gender="MALE" />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
