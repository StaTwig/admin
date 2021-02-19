import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";

const AddressField = (props) => {
  return (
    <div className="form-group row">
      <label
        htmlFor="{props.refe}"
        className="col-sm-5 txtColor col-form-label"
      >
        {props.label} *
      </label>
      <div className="col-sm-7">
        <input
          type="text"
          className="form-control border-top-0 border-right-0 border-left-0  rounded-0"
          id="{props.refe}"
          name="{props.refe}"
        />
      </div>
    </div>
  );
};

export default AddressField;
