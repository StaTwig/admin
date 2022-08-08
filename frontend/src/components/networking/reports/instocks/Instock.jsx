import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import InstockRow from "./InstockRow";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";

export default function Instock({ inStock, reportWarehouse }) {
  const { user } = useSelector((state) => state);
  const Distributor = user.type === "DISTRIBUTORS";
  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 665 }}
          className='mi-custom-table'
          aria-label='collapsible table'
        >
          <TableHead>
            <TableRow>
              <TableCell className='mi-custom-tableHead mi-first-cell-padding'>
                <Filter title='Product Category' />
              </TableCell>
              <TableCell className='mi-custom-tableHead'>
                <Filter title='Product Name' />
              </TableCell>
              {Distributor && (
                <TableCell className='mi-custom-tableHead'>
                  <Filter title='Product Manufacturer' />
                </TableCell>
              )}
              <TableCell className='mi-custom-tableHead'>
                <Filter title='Opening balance' />
              </TableCell>
              <TableCell className='mi-custom-tableHead'>
                <Filter title='Opening Current In stock (Qty)' />
              </TableCell>
              <TableCell className='mi-custom-tableHead'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inStock?.map((product, idx) => (
              <InstockRow
                product={product}
                reportWarehouse={reportWarehouse}
                key={idx}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
