import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";

export default function OrganizationRow({ rows }) {
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className={`organization-tr ${checked && "organization-bar-added"}`}
        onClick={() => history.push("/statwig/view-locations")}
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
            ABC Redfort Organization{" "}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            Manufacturer
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            12800
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            5
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            India
          </p>
        </TableCell>
        <TableCell>
          {rows.status ? (
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
              29/08/2022
            </p>
            <p
              className={`vl-small f-500 ${
                checked ? "vl-black" : "vl-grey-sm"
              }`}
            >
              11.00 AM
            </p>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
