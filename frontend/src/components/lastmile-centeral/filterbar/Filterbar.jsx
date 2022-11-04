import React from "react";
import "./Filterbar.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Autocomplete, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function Filterbar() {
  const city = [{ label: "City 1" }, { label: "City 2" }, { label: "City 3" }];

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="Filterbar--container">
      <div className="Filterbar--header">
        <h1 className="vl-subheading f-500 vl-black">Control Panel</h1>
      </div>
      <div className="Filterbar--body">
        <div className="Filterbar--filterCard">
          <div className="filterCard-header">
            <div className="filterCard-inner-header">
              <p className="vl-body f-500 vl-grey-md">Gender</p>
              <button className="filter-clear-btn">Clear</button>
            </div>
            <p className="vl-note f-400 vl-grey-xs">
              Choose the Gender to see the results
            </p>
          </div>
          <div className="filterCard-body side-space border-btm">
            <FormControl>
              <RadioGroup
                className="mui-custom-radio-group"
                defaultValue="male"
                name="radio-buttons-group"
              >
                {" "}
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="general"
                  control={<Radio />}
                  label="General"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="Filterbar--filterCard">
          <div className="filterCard-header">
            <div className="filterCard-inner-header">
              <p className="vl-body f-500 vl-grey-md">City</p>
              <button className="filter-clear-btn">Clear</button>
            </div>
            <p className="vl-note f-400 vl-grey-xs">
              Search the results by City wise
            </p>
          </div>
          <div className="filterCard-body border-btm">
            <Autocomplete
              disablePortal
              fullWidth
              options={city}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
          </div>
        </div>

        <div className="Filterbar--filterCard">
          <div className="filterCard-header">
            <div className="filterCard-inner-header">
              <p className="vl-body f-500 vl-grey-md">Organization</p>
              <button className="filter-clear-btn">Clear</button>
            </div>
            <p className="vl-note f-400 vl-grey-xs">
              Search the results by Organization Name
            </p>
          </div>
          <div className="filterCard-body border-btm">
            <Autocomplete
              disablePortal
              fullWidth
              options={city}
              renderInput={(params) => (
                <TextField {...params} label="Organization" />
              )}
            />
          </div>
        </div>

        <div className="Filterbar--filterCard">
          <div className="filterCard-header">
            <div className="filterCard-inner-header">
              <p className="vl-body f-500 vl-grey-md">Age</p>
              <button className="filter-clear-btn">Clear</button>
            </div>
            <p className="vl-note f-400 vl-grey-xs">
              Search the results by Organization Name
            </p>
          </div>
          <div className="filterCard-body side-space">
            <FormControl>
              <RadioGroup
                className="mui-custom-radio-group"
                defaultValue="range"
                name="radio-buttons-group"
              >
                {" "}
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Individual Age"
                />
                <FormControlLabel
                  value="range"
                  control={<Radio />}
                  label="Range Group"
                />
              </RadioGroup>
            </FormControl>
            <div className="slider-select">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
