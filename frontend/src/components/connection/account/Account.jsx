import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import GoogleIcon from "../../../assets/files/images/social/google.png";
import TorusIcon from "../../../assets/files/images/social/torus.png";

export default function Account() {
  const [RadioValue, setRadioValue] = React.useState("existing");

  console.log(RadioValue);

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

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
      <div className="vl-connection-container">
        <form action="" className="account-form-container">
          <hgroup className="form-headers">
            <h1 className="vl-heading f-700 vl-black">Create your Account</h1>
            <h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm">
              Join VaccineLedger to ensure quality and safety of your Vaccines
              using Blockchain
            </h2>
          </hgroup>
          <section className="vl-input-group form-auto-fill-section">
            <div className="input-two-auto-column">
              <div
                className="login-button-card"
                // onClick={() => {
                //   Navigate("/register/account", { replace: true });
                // }}
              >
                <div className="icon-space">
                  <img src={GoogleIcon} alt="social" />
                </div>
                <p className="vl-subheading f-500 no-space">
                  Sign Up with Google
                </p>
              </div>
              <div
                className="login-button-card"
                // onClick={() => {
                //   Navigate("/register/organization", { replace: true });
                // }}
              >
                <div className="icon-space">
                  <img src={TorusIcon} alt="social" />
                </div>
                <p className="vl-subheading f-500 no-space">
                  Sign Up with Wallet ID
                </p>
              </div>
            </div>
            <div className="option-divider">
              <div className="divider-bar"></div>
              <p className="vl-subheading vl-grey-xs">OR</p>
              <div className="divider-bar"></div>
            </div>
          </section>

          <section className="vl-input-group form-auto-fill-section">
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
            <div className="radio-btn-group">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <div className="vl-radio-btn vl-align-center">
                    <Radio
                      checked={RadioValue === "existing"}
                      onChange={handleChange}
                      value="existing"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <p className="vl-body f-400 vl-grey-md vl-line-sm">
                      Existing Organization
                    </p>
                  </div>
                  <div className="vl-radio-btn vl-align-center">
                    <Radio
                      onChange={handleChange}
                      value="new"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "B" }}
                    />
                    <p className="vl-body f-400 vl-grey-md vl-line-sm">
                      New Organization
                    </p>
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            {RadioValue === "existing" ? (
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
            ) : (
              <div className="vl-input-groups">
                <div className="input-full-column">
                  <Autocomplete
                    fullWidth
                    options={OrganizationTypes.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField {...params} label="Organization Type" />
                    )}
                  />
                </div>
                <div className="verify-terms-card-sm">
                  <Checkbox />
                  <h2 className="vl-subheading f-400 vl-grey-xs">
                    Skip the Organization Registration
                  </h2>
                </div>
              </div>
            )}
          </section>
          <section
            className={`call-by-action ${
              RadioValue === "existing" && "top-space"
            } `}
          >
            <button className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
              Continue
            </button>
          </section>
        </form>
      </div>
    </section>
  );
}
