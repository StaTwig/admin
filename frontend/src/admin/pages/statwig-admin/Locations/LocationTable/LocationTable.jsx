import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import LocationRow from "./LocationRow";

export default function LocationTable() {
  const Locations = [
    {
      id: "1",
      status: true,
    },
    {
      id: "2",
      status: true,
    },
    {
      id: "3",
      status: false,
    },
    {
      id: "4",
      status: true,
    },
    {
      id: "5",
      status: true,
    },
  ];
  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 665 }}
          className="vl-custom-table"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">Location Name</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">City</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">Address</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">Users</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">Status</h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Locations.map((product) => (
              <LocationRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
