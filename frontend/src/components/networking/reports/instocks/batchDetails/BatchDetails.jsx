import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { getBatchesofWarehouse } from "../../../../../actions/inventoryActions";
function BatchRow({ row, isNearExpiry }) {
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset !important" } }}
        className="mi-custom-tableRow"
      >
        <TableCell className="mi-custom-cell mi-radius-first mi-first-cell-padding">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">
              {row.batchNumbers[0]}
            </p>
            {isNearExpiry(row.attributeSet?.expDate).nearExpiry && (
              <Tooltip
                title={
                  isNearExpiry(row.attributeSet?.expDate).expiry
                    ? "Product expired"
                    : "Product near expiry"
                }
                placement="top"
              >
                <Button>
                  <i class="fa-solid fa-triangle-exclamation error-icon"></i>
                </Button>
              </Tooltip>
            )}
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">
              {row.quantity || 0}
            </p>
            <p className="mi-body-xs grey f-500 mi-reset mi-no-wrap">
              ( Packs )
            </p>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">
              {row.attributeSet?.mfgDate?.split("T")[0] || "N/A"}
            </p>
          </div>
        </TableCell>
        <TableCell className="mi-custom-cell">
          <div className="mi-table-data">
            <p className="mi-body-md black f-700 mi-reset">
              {row.attributeSet?.expDate?.split("T")[0] || "N/A"}
            </p>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function BatchDetails({ productId, warehouseId, isNearExpiry }) {
  const [Data, setData] = useState([]);
  useEffect(() => {
    async function getBatches() {
      const result = await getBatchesofWarehouse(warehouseId, productId);
      setData(result);
    }
    getBatches();
  }, [productId, warehouseId]);
  return (
    <>
      <TableContainer>
        <Table
          // sx={{ minWidth: 665 }}
          className="mi-custom-table"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="mi-custom-tableHead mi-first-cell-padding">
                <p className="mi-body-sm mi-reset grey-400">Batch Number</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">Quantity</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">Mfg Date</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">Exp Date</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data?.map((row) => (
              <BatchRow row={row} key={row.id} isNearExpiry={isNearExpiry} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
