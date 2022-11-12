import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import "./Configuration.css";
import Permission from "./Permission/Permission";

export default function Configuration() {
  const options = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
  ];
  return (
    <>
      <OrgHeader />
      <section className="admin-page-layout">
        <div className="admin-container">
          <div className="admin-role-container admin-section-space">
            <div className="role-headers">
              <div className="role-page-link">
                <p className="vl-subheading f-700">Configuration</p>
                <p className="vl-body f-400 vl-grey-sm">Roles & Permissions</p>
              </div>
              <button className="vl-btn vl-btn-md vl-btn-primary">
                Add Roles
              </button>
            </div>

            <div className="input-set">
              <p className="vl-body f-500 vl-black">Select Role</p>
              <div className="input-full-column-space">
                <Autocomplete
                  fullWidth
                  id="combo-box-demo"
                  className="vl-role-select"
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="WarehouseEmployeeJunior"
                    />
                  )}
                />
              </div>
            </div>

            <div className="permission-tab-ribbon">
              <div className="ribbon-tab active ">
                <p className="vl-body">User Role</p>
              </div>
              <div className="ribbon-tab">
                <p className="vl-body">Analytics</p>
              </div>
              <div className="ribbon-tab">
                <p className="vl-body">Payments</p>
              </div>
            </div>

            <Permission />
          </div>
        </div>
      </section>
    </>
  );
}
