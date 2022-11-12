import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function UnitUsedRow({ vial, index }) {
	return (
		<TableRow className="vl-mui-custom-tr">
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{index + 1}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{vial.batchNumber}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{vial.numberOfDoses}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{new Date(vial.createdAt).toDateString()}</p>
				</div>
			</TableCell>
		</TableRow>
	);
}
