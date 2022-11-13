import React, { useState, useEffect, useRef } from "react";
import "./Users.css";
import AnalyticsCard from "../../../common/AnalyticsCard/AnalyticsCard";
import { Dialog, DialogContent } from "@mui/material";
import UsersTable from "./UsersTable/UsersTable";
import AddUsers from "../../../components/AddUsers/AddUsers";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import { useDispatch, useSelector } from "react-redux";
import {
	addOrgUser,
	getAllOrganisations,
	getAllRoles,
	getAllRolesForTPL,
	getOrgActiveUsers,
	getPermissions,
	getRecentReqSent,
	getRequestsPending,
	getWareHouses,
	getOrgUserAnalytics,
} from "../../../actions/organisationActions";

let useClickOutside = (handler) => {
	let domNode = useRef();

	useEffect(() => {
		let maybeHandler = (event) => {
			if (!domNode.current.contains(event.target)) {
				handler();
			}
		};

		document.addEventListener("mousedown", maybeHandler);

		return () => {
			document.removeEventListener("mousedown", maybeHandler);
		};
	});

	return domNode;
};

export default function Users(props) {
	const dispatch = useDispatch();

	const permissions = useSelector((state) => state?.organisationReducer?.permissions);
	const addresses = useSelector((state) => state?.organisationReducer?.addresses);
	const { userAnalytics } = useSelector((state) => state.organisationReducer);
	const { totalCount, activeCount, inactiveCount } = userAnalytics;

	const [ButtonOpen, setButtonOpen] = useState(false);

	let domNode = useClickOutside(() => {
		setButtonOpen(false);
	});

	const [open, setOpen] = React.useState(false);
	const [defaultRoles, setDefaultRoles] = useState([]);

	const [fullWidth] = React.useState(true);
	const [maxWidth] = React.useState("md");

	useEffect(() => {
		dispatch(getRequestsPending());
		props.user.organisationType == "Third Party Logistics"
			? dispatch(getPermissions(props.user.organisationId))
			: dispatch(getPermissions());
		dispatch(getRecentReqSent());
		dispatch(getAllOrganisations());
		dispatch(getOrgActiveUsers());
		dispatch(getWareHouses());
		dispatch(getOrgUserAnalytics());

		//getRoles
		async function getRoles() {
			var roles = [];
			if (props.user.organisationType == "Third Party Logistics") {
				roles = await getAllRolesForTPL(props.user.organisationId);
			} else {
				roles = await getAllRoles();
			}
			setDefaultRoles(roles);
		}
		getRoles();
	}, []);

	const onSuccess = async (data) => {
		try {
			const result = await addOrgUser(data);
			if (result.status === 200) {
				console.log("User added successfully!");
				handleClose();
			} else {
				console.log("Error in adding user - ", result.data.message);
			}
		} catch (err) {
			console.log("error - ", err);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<OrgHeader />
			<section className="admin-page-layout">
				<div className="admin-container">
					<div className="admin-organization-container admin-section-space">
						<div className="tiles-three-column-layout">
							<AnalyticsCard
								layout="type4"
								icon="fa-building"
								value={totalCount}
								valueTitle="Total Number of Organization"
								bgColor="analytic-bg-1"
								textColor="analytic-text-1"
							/>
							<AnalyticsCard
								layout="type4"
								icon="fa-building"
								value={activeCount}
								valueTitle="Active Organization"
								bgColor="analytic-bg-2"
								textColor="analytic-text-2"
							/>
							<AnalyticsCard
								layout="type4"
								icon="fa-building"
								value={inactiveCount}
								valueTitle="In Active Organization"
								bgColor="analytic-bg-3"
								textColor="analytic-text-3"
							/>
						</div>
						<div className="organization-table-container">
							<div className="organization-table-header-area">
								<div className="table-search-bar">
									<i className="fa-solid fa-magnifying-glass"></i>
									<input type="text" placeholder="Search" />
								</div>
								<div className="table-actions-area">
									<div className="table-action-icon">
										<i className={`fa-solid fa-power-off vl-disabled`}></i>
									</div>
									<div className="table-action-icon">
										<i className={`fa-solid fa-trash-can vl-disabled`}></i>
									</div>
									<div className="table-dropdown-button" ref={domNode}>
										<button
											className="vl-btn vl-btn-alt vl-btn-primary"
											// onClick={() => setButtonOpen(!ButtonOpen)}
											onClick={handleClickOpen}
										>
											Add Users
										</button>

										<div className={`button-dropdown ${ButtonOpen && "active"}`}>
											<div className="btn-dropdown-card">
												<i className="fa-solid fa-upload"></i>
												<p className="vl-note f-500">Import Users</p>
											</div>
											<div className="btn-dropdown-card" onClick={handleClickOpen}>
												<i className="fa-solid fa-plus"></i>
												<p className="vl-note f-500">Add Users</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<UsersTable defaultRoles={defaultRoles} />
						</div>
					</div>
				</div>
				<Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
					<DialogContent sx={{ padding: "0rem !important" }}>
						<AddUsers
							handleClose={handleClose}
							addresses={addresses}
							defaultRoles={defaultRoles}
							onSuccess={onSuccess}
						/>
					</DialogContent>
				</Dialog>
			</section>
		</>
	);
}
