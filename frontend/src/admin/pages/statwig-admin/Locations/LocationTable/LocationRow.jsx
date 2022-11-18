import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

export default function LocationRow({ warehouse, orgDetails }) {
  const history = useHistory();
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset !important" } }}
        className="vl-custom-tableRow"
        onClick={() => history.push(`/statwig/view-users/${warehouse.id}/${orgDetails.id}`, {warehouse, orgDetails})}
      >
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">{warehouse.title}</p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">{warehouse.country?.countryName || warehouse.country}</p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">
            {warehouse.warehouseAddress.firstLine}
          </p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">{warehouse.employees?.length}</p>
        </TableCell>
        <TableCell align="center">
          {warehouse.status === "ACTIVE" ? (
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
      </TableRow>
    </>
  );
}
