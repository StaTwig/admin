import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

export default function UsersRow({ rows }) {
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = React.useState(false);
  const [Value, setValue] = React.useState("");
  const [checked, setChecked] = useState(false);
  console.log(checked);

  const options = [
    { label: "powerUser" },
    { label: "admin" },
    { label: "user" },
    { label: "tester" },
  ];
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className={`organization-tr ${checked && "organization-bar-added"}`}
      >
        <TableCell>
          <Checkbox
            className="vl-checkbox"
            value={checked}
            onChange={() => setChecked(!checked)}
            sx={{
              color: "#7e858f",
              "&.Mui-checked": {
                color: "#221ecc",
              },
            }}
          />
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            {`${rows.firstName} ${rows.lastName}`}
          </p>
        </TableCell>
        <TableCell>
          <div className="table-actions-space">
            <div className="vl-table-icon" onClick={() => setEdit(!Edit)}>
              {!Edit ? (
                <i class="fa-solid fa-pen"></i>
              ) : (
                <i class="fa-solid fa-check"></i>
              )}
            </div>
            <Autocomplete
              fullWidth
              disabled={Edit ? false : true}
              size="small"
              id="combo-box-demo"
              className={`${Edit ? "vl-edit-true" : "vl-edit-false"}`}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="vl-edit-input"
                  placeholder={rows.role}
                />
              )}
            />
          </div>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            {rows.emailId}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            {rows.phoneNumber}
          </p>
        </TableCell>
        <TableCell>
          <div className="table-actions-space">
            <div className="vl-table-icon" onClick={() => setOpen(!open)}>
              {open ? (
                <i class="fa-solid fa-caret-up"></i>
              ) : (
                <i class="fa-solid fa-caret-down"></i>
              )}
            </div>
            <p
              className={`vl-body ${
                checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
              }`}
            >
              {rows.location}
            </p>
          </div>
        </TableCell>
        <TableCell>
          {rows.accountStatus === "ACTIVE" ? (
            <div className="label-status-btn status-accept-bg">
              <div className="status-dot status-accept-dot"></div>
              <p className="vl-small f-500 vl-black">Active</p>
            </div>
          ) : (
            <div className="label-status-btn status-reject-bg">
              <div className="status-dot status-reject-dot"></div>
              <p className="vl-small f-500 vl-black">InActive</p>
            </div>
          )}
        </TableCell>
        <TableCell>
          <div className="created-date">
            <p
              className={`vl-note f-500 ${checked ? "vl-black" : "vl-grey-sm"}`}
            >
              {new Date(rows.createdAt).toLocaleDateString()}
            </p>
            <p
              className={`vl-small f-500 ${
                checked ? "vl-black" : "vl-grey-sm"
              }`}
            >
              {new Date(rows.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
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
                <p className="vl-note vl-black f-500">Address :</p>
                <p className="vl-body vl-grey-md">
                  {rows.location}
                </p>
              </div>
              <div className="location-detail-grid">
                <p className="vl-note vl-black f-500">Region :</p>
                <p className="vl-body vl-grey-md">{rows.region}</p>
              </div>
              <div className="location-detail-grid">
                <p className="vl-note vl-black f-500">Country :</p>
                <p className="vl-body vl-grey-md">{rows.country}</p>
              </div>
              {/* <div className="location-detail-grid">
                <p className="vl-note vl-black f-500">Pin :</p>
                <p className="vl-body vl-grey-md">{rows.pin}</p>
              </div> */}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
