import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Permission from "./permission";

const Role = (props) => {
  const {
    setSelectedValue,
    selectedValue,
    i,
    value,
    title,
    description,
  } = props;

  const dcolor = i % 2 === 0 ? "bg-light" : "bg-white";
  return (
    <div>
      <div
        className={`p-3 mb-1 d-flex flex-row justify-content-between ${dcolor} ${
          selectedValue == value ? "shadow" : ""
        }`}
      >
        <div className="form-check width30">
          <input
            className="form-check-input"
            type="radio"
            name="Radios"
            id={`Radios${i}`}
            value={value}
            onChange={(e) => {
              setSelectedValue(e.currentTarget.value);
            }}
          />
          <label className="form-check-label" for={`Radios${i}`}>
            {title}
          </label>
        </div>
        <div className="w-50">
          <span className="txtColor">{description}</span>
        </div>
        <div>
          <span>
            <i
              className="shadow"
              style={{ color: "#ccc" }}
              class="fa fa-info-circle"
            ></i>
          </span>
        </div>
      </div>
      <div
        className={`pl-5 ${
          selectedValue != value ? " d-none" : " bg-light mb-2"
        }`}
      >
        <Permission
          permissionTitle="Add Users"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Remove sers"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Deactivate Users"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Affiliate sers"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Unaffiliate sers"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Add Role"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Delete Role"
          permissionDescription="Description"
        />
        <Permission
          permissionTitle="Manage Addresses(Add or Remove)"
          permissionDescription="Description"
        />
      </div>
    </div>
  );
};

export default Role;
