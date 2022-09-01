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

export default function Instock({ inStock, inStockFilters, reportWarehouse, setInstockType, setInstockId }) {
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
              <TableCell className="mi-custom-tableHead mi-first-cell-padding">
                <Filter filters={inStockFilters} filterKey={"productCategory"} title="Product Category" setStockType={setInstockType} setStockId={setInstockId} />
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <Filter filters={inStockFilters} title="Product Name" filterKey={"productName"} setStockType={setInstockType} setStockId={setInstockId}/>
              </TableCell>
              {Distributor && (
                <TableCell className="mi-custom-tableHead">
                  <Filter
                    filters={inStockFilters}
                    title="Product Manufacturer"
                  />
                </TableCell>
              )}
              <TableCell className="mi-custom-tableHead">
                <div className="table-header-with-filter">
                  <p className="mi-body-sm mi-reset grey-400">
                    Opening balance
                  </p>
                </div>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <div className="table-header-with-filter">
                  <p className="mi-body-sm mi-reset grey-400">
                  Opening Current In stock (Qty)
                  </p>
                </div>
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
