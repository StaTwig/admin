import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import OutstockRow from "./OutstockRow";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";

export default function Outstock({outStock, outStockFilters, setOutstockType,setOutstockId, t}) {
  const {user} = useSelector((state) => state);
  const Distributor = user.type === "DISTRIBUTORS"
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
                <Filter
                    filters={outStockFilters}
                    title={t("product_category")}
                    filterKey="productCategory"
                    setStockType={setOutstockType}
                    setStockId={setOutstockId}
                  />
              </TableCell>
              <TableCell className="mi-custom-tableHead">
              <Filter
                    filters={outStockFilters}
                    title={t("product_name")}
                    filterKey="productName"
                    setStockType={setOutstockType}
                    setStockId={setOutstockId}
                  />
              </TableCell>
             {Distributor && <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">{t("product_manufacturer")}</p>
              </TableCell>}
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">
                {t("product_out_of_stock")}
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
