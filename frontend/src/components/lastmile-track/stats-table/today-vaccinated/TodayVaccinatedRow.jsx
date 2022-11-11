import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function TodayVaccinatedRow() {
  return (
    <TableRow className="vl-mui-custom-tr">
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">01</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">#20462</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">Male</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">29</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
