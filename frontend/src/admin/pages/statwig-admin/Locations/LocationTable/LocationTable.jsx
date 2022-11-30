import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import LocationRow from "./LocationRow";

export default function LocationTable({ Locations, orgDetails, t }) {
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
                <h1 className="vl-note f-500 vl-blue">
                  {t("location")} {t("name")}
                </h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">{t("city")}</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">{t("address")}</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">{t("users")}</h1>
              </TableCell>
              <TableCell className="vl-custom-tableHead" align="center">
                <h1 className="vl-note f-500 vl-blue">{t("status")}</h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
						{Locations &&
							Locations.map((warehouse) => (
								<LocationRow key={warehouse.id} warehouse={warehouse} orgDetails={orgDetails} />
							))}
					</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
