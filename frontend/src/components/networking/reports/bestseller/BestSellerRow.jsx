import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function BestSellerRow() {
  return (
    <TableRow
      sx={{ "& > *": { borderBottom: "unset !important" } }}
      className="mi-custom-tableRow"
    >
      <TableCell className="mi-custom-cell mi-radius-first mi-first-cell-padding">
        <div className="mi-table-data">
          <div className="table-icon-space">
            <i class="fa-solid fa-prescription-bottle-medical"></i>
          </div>
          <p className="mi-body-md black f-700 mi-reset">Tablet</p>
        </div>
      </TableCell>
      <TableCell className="mi-custom-cell">
        <div className="mi-table-data">
          <p className="mi-body-md black f-700 mi-reset">Paracetamol</p>
        </div>
      </TableCell>
      <TableCell className="mi-custom-cell">
        <div className="mi-table-data">
          <p className="mi-body-md black f-700 mi-reset">10000</p>
          <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">( Packs )</p>
        </div>
      </TableCell>
      <TableCell className="mi-custom-cell table-button-space mi-radius-last">
        <button className="nt-btn nt-btn-xs nt-btn-blue-alt">
          <i class="fa-solid fa-chart-pie"></i>
          <span>View</span>
        </button>
      </TableCell>
    </TableRow>
  );
}
