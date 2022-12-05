import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import UnitUsedRow from "./UnitUsedRow";
import EmptyIcon from "../../../../assets/files/designs/empty-table.jpg";

export default function UnitUsedTable({ unitsUtilized, t }) {
  return (
    <>
      <TableContainer className="vl-mui-custom-tablecontainer">
        <div className="Beneficiary--header">
          <h1 className="vl-subtitle f-700 vl-black">{t("total_util")}</h1>
        </div>
        {unitsUtilized && unitsUtilized.length ? (
          <Table sx={{ minWidth: 650 }} className="vl-mui-custom-table">
            <TableHead className="vl-mui-custom-tablehead">
              <TableRow className="vl-mui-custom-tr">
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">{t("s_no")}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">{t("batch_no")}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">
                      {t("no_of_vaccine")}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">{t("date")}</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="vl-mui-custom-tablebody">
              {unitsUtilized &&
                unitsUtilized.length &&
                unitsUtilized.map((vial, i) => (
                  <UnitUsedRow vial={vial} index={i} />
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="Table--Empty-container">
            <div className="Table--empty-illustartion">
              <img src={EmptyIcon} alt="EmptyIcon" />
              <h1 className="vl-subheading f-500 vl-black">{t("no_rec")}</h1>
            </div>
          </div>
        )}
        <div className="padding-space"></div>
      </TableContainer>
    </>
  );
}
