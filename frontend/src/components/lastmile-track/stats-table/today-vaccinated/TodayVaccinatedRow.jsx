import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function TodayVaccinatedRow({ dose, index }) {
	return (
		<TableRow className="vl-mui-custom-tr">
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{index + 1}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{dose.batchNumber}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{dose.gender}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{dose.age}</p>
				</div>
			</TableCell>
		</TableRow>
	);
}
