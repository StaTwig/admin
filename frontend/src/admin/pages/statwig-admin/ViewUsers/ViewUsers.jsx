import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LocationCard from "../../../common/LocationCard/LocationCard";
import TileCard from "../../../common/TileCard/TileCard";
import "./ViewUsers.css";
import UserTable from "./UserTable/UserTable";
import StatwigHeader from "../../../shared/Header/StatwigHeader/StatwigHeader";
import { useParams } from "react-router-dom";
import { getOrgDetails, getWarehouseAndUsersById } from "../../../actions/organisationActions";

export default function ViewUsers(props) {
	const history = useHistory();
	if (props.user.type !== "CENTRAL_AUTHORITY") {
		history.push("/overview");
	}

	const [orgDetails, setOrgDetails] = useState();
	const [warehouseDetails, setWarehouseDetails] = useState();

	const params = useParams();
	const orgId = params.orgId;
	const warehouseId = params.warehouseId;

	useEffect(() => {
		async function getOrganisationDetails() {
			try {
				const result = await getOrgDetails(orgId);
				if (result.status === 200) {
					setOrgDetails(result.data.data);
				} else {
					console.log("Org details request failed!");
				}
			} catch (err) {
				console.log("Error - ", err);
			}
		}
		getOrganisationDetails();
	}, [orgId]);

	useEffect(() => {
		async function getWarehouseDetails() {
			try {
				const result = await getWarehouseAndUsersById(warehouseId);
				if (result.status === 200) {
          setWarehouseDetails(result.data.data);
				} else {
					console.log("Warehouse details request failed!");
				}
			} catch (err) {
				console.log("Error - ", err);
			}
		}
		getWarehouseDetails();
	}, [warehouseId]);

	return (
		<>
			<StatwigHeader />
			<section className="admin-page-layout">
				<div className="admin-container">
					<div className="admin-location-container admin-section-space">
						<div className="admin-locations-left">
							<div className="previous-link-tabs">
								<Link to="/statwig/view-locations" className="link-card vl-link">
									<i className="fa-solid fa-arrow-left"></i>
									<p className="vl-subheading f-500">Manage Users</p>
								</Link>
								<div className="breadcumb-links vl-flex-sm">
									<Link to="/statwig/view-locations" className="vl-link">
										<p className="vl-small f-500 vl-grey-sm">Manage Locations</p>
									</Link>
									<p className="vl-note f-500 vl-grey-sm">/</p>
									<Link to="/statwig/view-users" className="vl-link">
										<p className="vl-small f-500 vl-grey-sm">Users</p>
									</Link>
								</div>
							</div>
							<div className="location-details-grid">
								<LocationCard
									layout="user"
									orgDetails={orgDetails}
									warehouseDetails={warehouseDetails}
								/>
								<TileCard layout="user" />
							</div>
						</div>

						<UserTable employees={warehouseDetails?.employees} />
					</div>
				</div>
			</section>
		</>
	);
}
