import React, { useState } from "react";
import "leaflet/dist/leaflet.css";

const AddressField = (props) => {
  const {
    refe,
    error,
    touched,
    label,
    handleBlur,
    handleChange,
    value,
  } = props;

  return (
    <div className="form-group row">
      <label htmlFor={refe} className="col-sm-5 txtColor col-form-label">
        {label} *
      </label>
      <div className="col-sm-7">
        <input
          type="text"
          className={`form-control border-top-0 border-right-0 border-left-0 rounded-0 ${
            error ? "border-danger" : ""
          }`}
          id={refe}
          onChange={handleChange}
          onBlur={handleBlur}
          name={refe}
          value={value}
        />
        {error && touched && (
          <span className="error-msg text-danger">{error}</span>
        )}
      </div>
    </div>
  );
};

export default AddressField;
