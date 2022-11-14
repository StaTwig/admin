import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import Switch from "@mui/material/Switch";

export default function OrganizationRow({ rows }) {
  const [checked, setChecked] = useState(true);
  const [AccStatus, setAccStatus] = useState(rows.accountStatus);
  const history = useHistory();
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className={`organization-tr ${checked && "organization-bar-added"}`}
        onClick={() =>
          history.push("/statwig/view-locations/" + JSON.stringify(rows))
        }
      >
        {/* <TableCell>
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
        </TableCell> */}
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {rows.name + " "}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {rows.type}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            12800
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {rows.warehouses.length}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-400 vl-black" : "f-400 vl-grey-sm"
            }`}
          >
            {rows.country}
          </p>
        </TableCell>
        <TableCell>
          <div className="status-switch-button">
            <Switch
              color="warning"
              checked={AccStatus === "ACTIVE"}
              onChange={(e) => setAccStatus(e.target.checked)}
            />
            {AccStatus === "ACTIVE" ? (
              <div className="label-status-btn status-accept-bg">
                <div className="status-dot status-accept-dot"></div>
                <p className="vl-small f-400 vl-black">Active</p>
              </div>
            ) : (
              <div className="label-status-btn status-reject-bg">
                <div className="status-dot status-reject-dot"></div>
                <p className="vl-small f-400 vl-black">InActive</p>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="created-date">
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
    </>
  );
}
