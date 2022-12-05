import { TableCell, TableRow } from "@mui/material";
import { format } from "date-fns";
import React from "react";

export default function UnitUsedRow({ vial, index }) {
  return (
    <TableRow className="vl-mui-custom-tr">
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">{index + 1}</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">{vial.batchNumber}</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">{vial.numberOfDoses}</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">
            {format(new Date(vial.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
