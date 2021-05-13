import React, { useState } from "react";
import Location from "../../assets/icons/Location.png";
import Location1 from "../../assets/icons/add_new_location.png";
import DropdownButton from "../../shared/dropdownButtonGroup";

import { Link } from "react-router-dom";

const PopUpLocation = (props) => {
  const [wareHouse, setWareHouse] = useState("");
  const [selectLocation, setSelectLocation] = useState("Select Location");


  return (
    <div class="">
      <center>
        <h1 className="">
          <b>Add Location</b>
        </h1>
      </center>
      <br></br>

      <div className="slectloc1">
        <div className="row">
          <div className="col-md-6 com-sm-10">
            <div className="form-group">
              <img src={Location} height="30" width="20" className="pt-2"></img>
              <label htmlFor="Select Location" className="pt-3">
                <b>Select Location</b>
              </label>
              <div className="form-control">
                <DropdownButton
                  name={selectLocation}
                  name2="Select Location"
                  onSelect={(v)=>{
                    selectLocation(v);
                    setWareHouse(v);
                  }}
                  groups={props.wareHouses}
                />.
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <center>
        <h7>------------------------- Or -------------------------</h7>
      </center>
      <div class="wrapper1">
        <Link to={"/Addlocation"}>
          <button className="btn btn-orange fontSize18 font-bold">
            <img src={Location1} width="23" height="23" className="mr-2 mb-1" />
            <span>
              <b>Add New Location</b>
            </span>
          </button>
        </Link>
      </div>

      <div class="wrapper1">
        <button className="btn btn-orange fontSize20 font-bold mr-4">
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
};
export default PopUpLocation;
