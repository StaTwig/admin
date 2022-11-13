import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

export default function LocationRow({ product, org }) {
  const history = useHistory();
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset !important" } }}
        className="vl-custom-tableRow"
        onClick={() => history.push(`/statwig/view-users/${JSON.stringify(product)}/${JSON.stringify(org)}`, {product, org})}
      >
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">{product.title}</p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">{product.country?.countryName || product.country}</p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">
            {product.postalAddress}
          </p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">{product.employees?.length}</p>
        </TableCell>
        <TableCell align="center">
          {product.status === "ACTIVE" ? (
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
