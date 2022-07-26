import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import OutstockRow from "./OutstockRow";

export default function Outstock({outStock}) {
  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 665 }}
          className="mi-custom-table"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="mi-custom-tableHead mi-first-cell-padding">
                <p className="mi-body-sm mi-reset grey-400">Product Category</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">Product Name</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">
                  Product out of stock
                </p>
              </TableCell>
              <TableCell className="mi-custom-tableHead"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outStock.map((product, index) => (
              <OutstockRow product={product} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
