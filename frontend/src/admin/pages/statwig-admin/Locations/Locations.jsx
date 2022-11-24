import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LocationCard from "../../../common/LocationCard/LocationCard";
import TileCard from "../../../common/TileCard/TileCard";
import StatwigHeader from "../../../shared/Header/StatwigHeader/StatwigHeader";
import LocationMap from "./LocationMap/Map";
import "./Locations.css";
import LocationTable from "./LocationTable/LocationTable";
import { fetchWarehousesByOrgId, getOrgDetails, getWareHouses } from "../../../actions/organisationActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Locations(props) {
	const history = useHistory();
	if (props.user.type !== "CENTRAL_AUTHORITY") {
		history.push("/overview");
	}

  const [Map, setMap] = useState(false);
	const [orgDetails, setOrgDetails] = useState();
	const [addresses, setAddresses] = useState();

	const params = useParams();
	const orgId = params.orgId;

	useEffect(() => {
		async function getWarehousesForOrg() {
			try {
				const result = await fetchWarehousesByOrgId(orgId);
				if(result.status === 200) {
					setAddresses(result.data.data);
				} else {
					console.log("Warehouses request failed!");
				}
			} catch(err) {
				console.log("Error - ", err);
			}
		}
		getWarehousesForOrg();

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

	return (
		<>
			<StatwigHeader />
			<section className="admin-page-layout">
				<div className="admin-container">
					<div className="admin-location-container admin-section-space">
						<div className="admin-locations-left">
							<div className="previous-link-tabs">
								<Link to="/statwig/manage-organization" className="link-card vl-link">
									<i className="fa-solid fa-arrow-left"></i>
									<p className="vl-subheading f-500">Manage Locations</p>
								</Link>
								<div className="breadcumb-links vl-flex-sm">
									<Link to="/statwig/manage-organization" className="vl-link">
										<p className="vl-small f-500 vl-grey-sm">Manage Organization</p>
									</Link>
									<p className="vl-note f-500 vl-grey-sm">/</p>
									<Link to="/statwig/view-locations" className="vl-link">
										<p className="vl-small f-500 vl-grey-sm">Locations</p>
									</Link>
								</div>
							</div>
							<div className="location-details-grid">
                <LocationCard layout="location" orgDetails={orgDetails} />
                <TileCard layout="location" />
              </div>

							<div className="map-view-button" onClick={() => setMap(!Map)}>
								<button className="vl-btn vl-btn-md vl-btn-secondary">
									{Map ? (
										<>
											<span>
												<i className="fa-solid fa-table"></i>
											</span>
											View Table
										</>
									) : (
										<>
											<span>
												<i className="fa-solid fa-map-location-dot"></i>
											</span>
											View Map
										</>
									)}
								</button>
							</div>
						</div>
						{
							Map ? (
								<div className="Locationmap-container">
									<LocationMap warehouses={addresses} />
								</div>
							) :
							<LocationTable Locations={addresses} orgDetails={orgDetails} />
						}
					</div>
				</div>
			</section>
		</>
	);
}
