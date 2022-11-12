import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllRoles, getPermissionByRole } from "../../../actions/organisationActions";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import "./Configuration.css";
import Permission from "./Permission/Permission";

export default function Configuration() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [permissions, setPermissions] = useState({});
  async function getUserRoles(){
    const roles = await getAllRoles();
    setRoles(roles);
  }
  useEffect(() => { 
    getUserRoles();
  }, [])
  async function getRolePermissions(){
    const permissions = await getPermissionByRole(selectedRole);
    setPermissions(permissions);
  }
  useEffect(() => { 
    getRolePermissions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole])
  const uniq = [...new Set(roles)];

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
                <Select
                  fullWidth
                  id="combo-box-demo"
                  className="vl-role-select"
                  onChange={(e) => setSelectedRole(e.target.value)}
                  value={selectedRole}
                >
                  {uniq.map((role) => <MenuItem value={role} key={role}>{role}</MenuItem>)}
                </Select>
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

            <Permission permissions={permissions[0]} />
          </div>
        </div>
      </section>
    </>
  );
}
