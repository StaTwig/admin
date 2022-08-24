import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Account() {
  const OrganizationTypes = [
    { title: "Manufacturer" },
    { title: "Distributor" },
    { title: "Pharmacy" },
    { title: "User" },
    { title: "PowerUser" },
  ];

  const OrganizationNames = [
    { title: "Statwig" },
    { title: "vaccineledger" },
    { title: "cargoledger" },
    { title: "foodledger" },
    { title: "nft" },
  ];
  return (
    <section className="account-section">
      <div className="mi-connection-container">
        <form action="" className="account-form-container">
          <hgroup className="form-headers">
            <h1 className="mi-heading f-700 mi-black">Create your Account</h1>
            <h2 className="mi-subheading f-400 mi-grey-xs mi-line-sm">
              Join VaccineLedger to ensure quality and safety of your Vaccines
              using Blockchain
            </h2>
          </hgroup>
          <section className="mi-input-group form-auto-fill-section">
            <div className="input-two-column">
              <TextField fullWidth variant="outlined" label="First Name" />
              <TextField fullWidth variant="outlined" label="Last Name" />
            </div>
            <div className="input-single-column">
              <TextField fullWidth variant="outlined" label="Email Address" />
            </div>
            <div className="input-single-column">
              <TextField
                fullWidth
                variant="outlined"
                label="Phone Number ( Optional )"
              />
            </div>
          </section>
          <section className="mi-input-group form-manual-fill-section">
            <h2 className="mi-subheading f-400 mi-grey-xs mi-line-sm">
              Please fill the details about your Organization
            </h2>
            <div className="input-two-column">
              <Autocomplete
                fullWidth
                options={OrganizationTypes.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Organization Type" />
                )}
              />
              <Autocomplete
                fullWidth
                options={OrganizationNames.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Organization Name" />
                )}
              />
            </div>
          </section>
          <section className="call-by-action">
            <button className="mi-btn mi-btn-md mi-btn-full mi-btn-primary">
              Continue
            </button>
          </section>
        </form>
      </div>
    </section>
  );
}
