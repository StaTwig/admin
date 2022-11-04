import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import CenteralStatsRow from "./CenteralStatsRow";

export default function CenteralStatsTable() {
  const rows = [{}, {}, {}, {}, {}, {}, {}];
  return (
    <>
      <TableContainer className="vl-mui-custom-tablecontainer">
        <Table sx={{ minWidth: 650 }} className="vl-mui-custom-table">
          <TableHead className="vl-mui-custom-tablehead">
            <TableRow className="vl-mui-custom-tr">
              <TableCell align="center">
                <div className="vl-table-column">
                  <p className="vl-body f-500 vl-blue">Batch Number</p>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="vl-table-column">
                  <p className="vl-body f-500 vl-blue">Organization Name</p>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="vl-table-column">
                  <p className="vl-body f-500 vl-blue">Location</p>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="vl-table-column">
                  <p className="vl-body f-500 vl-blue">Gender</p>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="vl-table-column">
                  <p className="vl-body f-500 vl-blue">Age</p>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="vl-mui-custom-tablebody">
            {rows.map((row) => (
              <CenteralStatsRow />
            ))}
          </TableBody>
        </Table>
        <div className="padding-space"></div>
      </TableContainer>
    </>
  );
}
