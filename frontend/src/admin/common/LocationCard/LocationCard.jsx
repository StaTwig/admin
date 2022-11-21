import React from "react";
import Avatar from "@mui/material/Avatar";
import "./LocationCard.css";

export default function LocationCard({ layout, orgDetails, warehouseDetails }) {
	return (
		<>
			{layout === "location" && (
				<div className="admin-location-card-container">
					<div className="admin-location-header">
						<Avatar className="location-avatar">
							{orgDetails?.name[0] ? orgDetails?.name[0] : "N/A"}
						</Avatar>
						<h1 className="vl-subheading f-700">{orgDetails?.name ? orgDetails?.name : "N/A"}</h1>
					</div>
					<div className="admin-location-body">
						<div className="admin-location-card-grid">
							<i className="fa-solid fa-user vl-blue"></i>
							<p className="vl-body f-400 vl-grey-sm">{orgDetails?.type ? orgDetails.type : "N/A"}</p>
						</div>
					</div>
				</div>
			)}

			{layout === "user" && (
				<div className="admin-location-card-container">
					<div className="admin-location-header">
						<Avatar className="location-avatar">R</Avatar>
						<h1 className="vl-subheading f-700">{orgDetails?.name ? orgDetails?.name : "N/A"}</h1>
					</div>
					<div className="admin-location-body">
						<div className="admin-location-card-grid">
							<i className="fa-solid fa-user vl-blue"></i>
							<p className="vl-body f-400 vl-grey-sm">
								{warehouseDetails?.title ? warehouseDetails?.title : "N/A"}
							</p>
						</div>
						<div className="admin-location-card-grid">
							<i className="fa-solid fa-location-dot vl-blue"></i>
							<p className="vl-body f-400 vl-grey-sm">
								{warehouseDetails?.warehouseAddress?.firstLine
									? warehouseDetails?.warehouseAddress.firstLine
									: "N/A"}
							</p>
						</div>
						<div className="admin-location-card-grid">
							<i className="fa-solid fa-city vl-blue"></i>
							<p className="vl-body f-400 vl-grey-sm">
								{warehouseDetails?.warehouseAddress?.city
									? warehouseDetails?.warehouseAddress.city
									: "N/A"}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
