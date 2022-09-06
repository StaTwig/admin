import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";

export default function Organization() {
  const Region = [
    { title: "Asia" },
    { title: "Middle East" },
    { title: "Central America" },
    { title: "Africa" },
    { title: "Caribbean" },
  ];

  const Country = [
    { title: "India" },
    { title: "Srilanka" },
    { title: "Pakistan" },
    { title: "China" },
    { title: "America" },
  ];

  const City = [
    { title: "Hyderabad" },
    { title: "Dindigul" },
    { title: "Chennai" },
    { title: "Adilabad" },
    { title: "Warangal" },
  ];
  return (
    <section className="account-section">
      <div className="vl-connection-container">
        <form action="" className="account-form-container">
          <hgroup className="form-headers">
            <h1 className="vl-heading f-700 vl-black">
              Register your Organization
            </h1>
            <h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm">
              Almost there, Please provide the below details to regsiter your
              organization with us
            </h2>
          </hgroup>
          <section className="vl-input-group form-auto-fill-section">
            <div className="input-single-column">
              <TextField
                fullWidth
                variant="outlined"
                label="Organization Name"
              />
            </div>
            <div className="input-two-column">
              <Autocomplete
                fullWidth
                options={Region.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Region" />
                )}
              />
              <Autocomplete
                fullWidth
                options={Country.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Country" />
                )}
              />
            </div>
            <div className="input-two-column">
              <Autocomplete
                fullWidth
                options={City.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="City" />}
              />
              <TextField fullWidth variant="outlined" label="Pin" />
            </div>
            <div className="input-single-column">
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                multiline
              />
            </div>
            <section className="terms-condition">
              <div className="verify-terms-card">
                <Checkbox />
                <h2 className="vl-subheading f-400 vl-grey-xs">
                  By checking this your are agree to the{" "}
                  <span className="vl-blue">Terms & conditions</span> of
                  <span className="vl-blue"> Vaccineledger</span>
                </h2>
              </div>
            </section>
          </section>
          <section className="call-full-btn-action">
            <button className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
              Register
            </button>
          </section>
        </form>
      </div>
    </section>
  );
}
