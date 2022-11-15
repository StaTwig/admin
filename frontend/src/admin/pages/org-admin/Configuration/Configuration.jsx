import { Autocomplete, Dialog, DialogContent, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Modal from "../../../../shared/modal";
import {
	getAllRoles,
	getPermissionByRoleAndOrg,
	getPermissions,
	updatePermissionsByRole,
} from "../../../actions/organisationActions";
import AddRole from "../../../components/AddRole/AddRole";
import AssignRole from "../../../components/AssignRole/AssignRole";
import StatwigHeader from "../../../shared/Header/StatwigHeader/StatwigHeader";
import SuccessPopup from "../../../shared/Popup/SuccessPopup";
import "./Configuration.css";
import Permission from "./Permission/Permission";

export default function Configuration(props) {
	const history = useHistory();
	if (props.user.type !== "CENTRAL_AUTHORITY") {
		history.push("/overview");
	}

	const [roles, setRoles] = useState([]);
	const [selectedRole, setSelectedRole] = useState("admin");
	const [permissions, setPermissions] = useState({});
	const [updatedPermissions, setUpdatedPermissions] = useState(null);
	const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

	async function getUserRoles() {
		const roles = await getAllRoles();
		setRoles(roles);
	}
	useEffect(() => {
		getUserRoles();
	}, []);
	const dispatch = useDispatch();
	async function getRolePermissions() {
		const permissions = await getPermissionByRoleAndOrg(selectedRole, props.user.organisationId);
		const allPermissions = await dispatch(getPermissions());
		setPermissions(permissions);
		let updates = {
			admin: permissions[0].admin,
			inventory: permissions[0].inventory,
			iot: permissions[0].iot,
			network: permissions[0].network,
			order: permissions[0].order,
			overview: permissions[0].overview,
			search: permissions[0].search,
			shipment: permissions[0].shipment,
			track: permissions[0].track,
		};
		setUpdatedPermissions(updates);
	}

	useEffect(() => {
		getRolePermissions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRole]);

	async function permissionUpdate() {
		if (updatedPermissions) {
			const res = await updatePermissionsByRole({
				permissions: updatedPermissions,
				orgId: props.user.organisationId,
				role: selectedRole,
			});
			setOpenSuccessPopup(true);
		}
	}

	const uniq = [...new Set(roles)];

	async function updatePermissions(permissionType, data) {
		let updates = updatedPermissions;
    updates[permissionType] = data;
    console.log(updates, updatedPermissions);
		setUpdatedPermissions(updates);
	}

	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const [fullWidth] = React.useState(true);
	const [maxWidth] = React.useState("md");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};

	const closeModal = () => {
		setOpenSuccessPopup(false);
		// props.history.push("/inventory");
	};
	return (
		<>
			<StatwigHeader />
			<section className="admin-page-layout">
				<div className="admin-container">
					<div className="admin-role-container admin-section-space">
						<div className="role-headers">
							<div className="role-page-link">
								<p className="vl-subheading f-700">Configuration</p>
								<p className="vl-body f-400 vl-grey-sm">Roles & Permissions</p>
							</div>
							{/* <div className="config-btn-group">
                <button
                  className="vl-btn vl-btn-md vl-btn-secondary"
                  onClick={handleClickOpen2}
                >
                  Assign Role to User
                </button>
                <button
                  className="vl-btn vl-btn-md vl-btn-primary"
                  onClick={handleClickOpen}
                >
                  Add Roles
                </button>
              </div> */}
						</div>

						<div className="input-set">
							<p className="vl-body f-500 vl-black">Select Role</p>
							<div className="input-full-column-space">
								<Select
									fullWidth
									id="combo-box-demo"
									className="vl-role-select"
									onChange={(e) => setSelectedRole(e.target.value)}
									value={selectedRole}
								>
									{uniq.map((role) => (
										<MenuItem value={role} key={role}>
											{role}
										</MenuItem>
									))}
								</Select>
							</div>
						</div>

						<div className="permission-tab-ribbon">
							<div className="ribbon-tab active ">
								<p className="vl-body">User Role</p>
							</div>
							<div className="ribbon-tab">
								<p className="vl-body">Analytics</p>
							</div>
							<div className="ribbon-tab">
								<p className="vl-body">Payments</p>
							</div>
						</div>

						<Permission
							permissions={permissions[0]}
							updatePermissions={updatePermissions}
							permissionUpdate={permissionUpdate}
							updatedPermissions={updatedPermissions}
						/>
					</div>
				</div>
			</section>
			{openSuccessPopup && (
				<Modal
					close={() => closeModal()}
					size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
				>
					<SuccessPopup
						onHide={closeModal}
						successMessage="Permissions updated successfully"
						// errorMessage="Put the Error Message Here"
					/>
				</Modal>
			)}
			<Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
				<DialogContent sx={{ padding: "0rem !important" }}>
					<AddRole handleClose={handleClose} />
				</DialogContent>
			</Dialog>

			<Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open2} onClose={handleClose2}>
				<DialogContent sx={{ padding: "0rem !important" }}>
					<AssignRole handleClose={handleClose2} />
				</DialogContent>
			</Dialog>
		</>
	);
}
