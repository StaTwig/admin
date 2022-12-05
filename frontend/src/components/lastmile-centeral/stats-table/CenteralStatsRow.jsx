import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function CenteralStatsRow({ data }) {
	return (
		<TableRow className="vl-mui-custom-tr">
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">#{data.batchNumber}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{data.organisationName}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{data.location}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{data.gender}</p>
				</div>
			</TableCell>
			<TableCell component="th" scope="row" align="center">
				<div className="vl-table-body-column">
					<p className="vl-body f-500 ">{data.age}</p>
				</div>
			</TableCell>
		</TableRow>
	);
}
