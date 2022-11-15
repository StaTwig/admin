import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import BestSellerRow from "./BestSellerRow";
import { useSelector } from "react-redux";

export default function BestSeller({ bestseller, t }) {
  const {user} = useSelector((state) => state);
  const Distributor = user.type === "DISTRIBUTORS"
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
                <p className='mi-body-sm mi-reset grey-400'>{t("product_category")}</p>
              </TableCell>
              <TableCell className='mi-custom-tableHead'>
                <p className='mi-body-sm mi-reset grey-400'>{t("product_name")}</p>
              </TableCell>
            {Distributor &&  <TableCell className='mi-custom-tableHead'>
                <p className='mi-body-sm mi-reset grey-400'>{t("product_manufacturer")}</p>
              </TableCell>}
              <TableCell className='mi-custom-tableHead'>
                <p className='mi-body-sm mi-reset grey-400'>
                {t("no_of_units_solds")}
                </p>
              </TableCell>
              <TableCell className='mi-custom-tableHead'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bestseller.map((product, index) => (
              <BestSellerRow product={product} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
