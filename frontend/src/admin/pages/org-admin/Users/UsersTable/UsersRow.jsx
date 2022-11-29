import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import {
  activateOrgUser,
  deactivateOrgUser,
  updateUserRole,
} from "../../../../actions/organisationActions";
import Switch from "@mui/material/Switch";

export default function UsersRow({ rows, defaultRoles, t }) {
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = React.useState(false);
  const [checked, setChecked] = useState(true);
  const [userRole, setUserRole] = useState(rows.role);
  const [AccStatus, setAccStatus] = useState(rows.accountStatus);

  console.log(rows);

  const handleRoleChange = (event, value) => {
    setUserRole(value);
  };

  const handleEditRole = async () => {
    try {
      if (Edit) {
        if (userRole !== rows.role) {
          // Update user role
          console.log(rows);
          const result = await updateUserRole({
            userId: rows.id,
            role: userRole,
          });
          if (result.status === 200) {
            console.log("Role change successful!");
          } else {
            console.log("Error in changing role!");
          }
        }
      }
      setEdit(!Edit);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className={`organization-tr`}
      >
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {`${rows.firstName} ${rows.lastName}`}
          </p>
        </TableCell>
        <TableCell>
          <div className='table-actions-space col-width-md'>
            {Edit ? (
              <Autocomplete
                fullWidth
                disabled={Edit ? false : true}
                size='small'
                id='combo-box-demo'
                className={`${Edit ? "vl-edit-true" : "vl-edit-false"}`}
                options={defaultRoles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className='vl-edit-input'
                    placeholder={rows.role}
                  />
                )}
                onChange={handleRoleChange}
              />
            ) : (
              <p
                className={`vl-body ${
                  checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
                }`}
              >
                {rows.role}
              </p>
            )}

            <div className='vl-table-icon' onClick={handleEditRole}>
              {!Edit ? (
                <i className='fa-solid fa-pen'></i>
              ) : (
                <i className='fa-solid fa-check'></i>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {rows.emailId}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {rows.phoneNumber}
          </p>
        </TableCell>
        <TableCell>
          <div className='table-actions-space col-width-xl'>
            <p
              className={`vl-note ${
                checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
              }`}
            >
              {`${rows.location}, ${rows.city}, ${rows.country}, ${rows.region}`}
            </p>
            <div className='vl-table-icon' onClick={() => setOpen(!open)}>
              {open ? (
                <i className='fa-solid fa-caret-up'></i>
              ) : (
                <i className='fa-solid fa-caret-down'></i>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          {/* {rows.accountStatus === "ACTIVE" ? (
            <div className="label-status-btn status-accept-bg">
              <div className="status-dot status-accept-dot"></div>
              <p className="vl-small f-400 vl-black">Active</p>
            </div>
          ) : (
            <div className="label-status-btn status-reject-bg">
              <div className="status-dot status-reject-dot"></div>
              <p className="vl-small f-400 vl-black">InActive</p>
            </div>
          )} */}
          <div className='status-switch-button'>
            <Switch
              color='warning'
              checked={AccStatus === "ACTIVE"}
              onChange={(e) => {
                if (AccStatus === "ACTIVE") {
                  deactivateOrgUser({ id: rows?.id, index: rows?.ridex });
                  setAccStatus("INACTIVE");
                } else {
                  activateOrgUser({
                    id: rows?.id,
                    role: rows?.role,
                    index: rows?.ridex,
                  });
                  setAccStatus("ACTIVE");
                }
              }}
              // onChange={(e) => setAccStatus(e.target.checked)}
            />
            {AccStatus === "ACTIVE" ? (
              <div className="label-status-btn status-accept-bg">
                <div className="status-dot status-accept-dot"></div>
                <p className="vl-small f-400 vl-black">{t("active")}</p>
              </div>
            ) : (
              <div className="label-status-btn status-reject-bg">
                <div className="status-dot status-reject-dot"></div>
                <p className="vl-small f-400 vl-black">{t("inactive")}</p>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className='created-date'>
            <p
              className={`vl-note f-400 ${checked ? "vl-black" : "vl-grey-sm"}`}
            >
              {new Date(rows.createdAt).toLocaleDateString()}
            </p>
            <p
              className={`vl-small f-400 ${
                checked ? "vl-black" : "vl-grey-sm"
              }`}
            >
              {new Date(rows.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{
            paddingBottom: "0px !important",
            paddingTop: "0px !important",
          }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="user-location-detail-container">
              <div className="location-detail-grid">
                <p className="vl-note vl-black f-400">{t("address")} :</p>
                <p className="vl-body vl-grey-md">{rows.location}</p>
              </div>
              <div className="location-detail-grid">
                <p className="vl-note vl-black f-400">{t("region")} :</p>
                <p className="vl-body vl-grey-md">{rows.region}</p>
              </div>
              <div className="location-detail-grid">
                <p className="vl-note vl-black f-400">{t("country")} :</p>
                <p className="vl-body vl-grey-md">{rows.country}</p>
              </div>
              {/* <div className="location-detail-grid">
                <p className="vl-note vl-black f-400">Pin :</p>
                <p className="vl-body vl-grey-md">{rows.pin}</p>
              </div> */}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
