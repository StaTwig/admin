import React, { useEffect, useState } from "react";
import "./Pendings.css";
import {
	getAllRoles,
	getAllRolesForTPL,
	getRequestsPending,
	rejectOrgUser,
	verifyOrgUser,
} from "../../../../actions/organisationActions";
import { useDispatch, useSelector } from "react-redux";
import ApproveUser from "../../../../components/ApproveUser/ApproveUser";
import { Dialog } from "@mui/material";
import { turnOff, turnOn } from "../../../../../actions/spinnerActions";

function PendingCard({
	t,
	userName,
	orgName,
	createdAt,
	emailId,
	region,
	userId,
	country,
	phoneNumber,
	postalAddress,
	index,
	setData,
	setTitle,
	setShowModal,
	rejectUser,
}) {
	const approveUser = () => {
		setData({
			id: userId,
			ref: emailId,
			emailId: emailId, // Same as above but for a different purpose
			phoneNumber: phoneNumber,
			rindex: index,
		});
		setTitle("ASSIGN USER ROLE");
		setShowModal(true);
	};

	return (
		<div className="pendingCard-container">
			<div className="pendingcard-header">
				<div className="pc-name-space">
					<p className="vl-subheading f-500 vl-blue">{userName}</p>
					<p className="vl-small f-400 vl-grey-xs">{new Date(createdAt).toDateString()}</p>
				</div>
				<div className="organization-name">
					<p className="vl-body f-500 vl-black">{orgName} </p>
				</div>
			</div>
			<div className="pendingcard-body">
				<div className="pc-body-grid">
					<p className="vl-body f-500 vl-black">{t("email")}:</p>
					<p className="vl-body f-500 vl-grey-sm">{emailId}</p>
				</div>
				<div className="pc-body-two-space">
					<div className="pc-body-grid">
						<p className="vl-body f-500 vl-black">{t("region")}:</p>
						<p className="vl-body f-500 vl-grey-sm">{region}</p>
					</div>
					<div className="pc-body-grid">
						<p className="vl-body f-500 vl-black">{t("country")}:</p>
						<p className="vl-body f-500 vl-grey-sm">{country}</p>
					</div>
				</div>
				<div className="pc-body-col-space">
					<p className="vl-body f-500 vl-black">{t("org_address")}:</p>
					<p className="vl-body f-500 vl-grey-sm">{postalAddress}</p>
				</div>
			</div>
			<div className="pendingcard-action vl-flex vl-gap-sm">
				<button onClick={approveUser} className="vl-btn vl-btn-sm vl-btn-accept">
					{t("accept")}
				</button>
				<button
					onClick={() => rejectUser({ id: userId })}
					className="vl-btn vl-btn-sm vl-btn-reject"
				>
					{t("reject")}
				</button>
			</div>
		</div>
	);
}

export default function PendingUsers(props) {
	const { t, permissions, addresses, heading } = props;
	const dispatch = useDispatch();
	const { requestPending } = useSelector((state) => state.organisationReducer);

	const [showModal, setShowModal] = useState(false);
	const [userData, setUserData] = useState([]);
	const [title, setTitle] = useState();
	const [defaultRoles, setDefaultRoles] = useState([]);
	const [fullWidth] = useState(true);
	const [maxWidth] = useState("md");

	useEffect(() => {
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

	useEffect(() => {
		dispatch(getRequestsPending());
	}, [dispatch]);

	const acceptApproval = async (data) => {
		try {
			dispatch(turnOn());
			const result = await verifyOrgUser(data);
			if (result.status === 200) {
				console.log("User Approved - ", result.data.message);
				dispatch(getRequestsPending());
			} else {
				console.log("User approval failed - ", result.data.message);
			}
			dispatch(turnOff());
		} catch (err) {
			dispatch(turnOff());
			console.log(err);
		}
	};

	const rejectUser = async (data) => {
		try {
			dispatch(turnOn());
			const result = await rejectOrgUser({ id: data.id });
			if (result.status === 200) {
				console.log("User rejected - ", result.data.message);
				dispatch(getRequestsPending());
			} else {
				console.log("User rejection failed - ", result.data.message);
			}
			dispatch(turnOff());
		} catch (err) {
			dispatch(turnOff());
			console.log(err);
		}
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<section className="pending-container">
			<div className="pending-header">
				<h1 className="vl-subheading f-700 vl-black">{t("pending")}</h1>
				<div className="number-label">{requestPending.length || 0}</div>
			</div>
			<div className="pending-body">
				{requestPending.map((request, index) => (
					<PendingCard
						t={t}
						emailId={request.emailId}
						region={request?.orgDetails?.region}
						country={request?.orgDetails?.country}
						postalAddress={request?.orgDetails?.postalAddress}
						orgName={request?.orgDetails?.name}
						key={request.id}
						userId={request.id}
						userName={`${request.firstName} ${request.lastName}`}
						organisationId={request.organisationId}
						createdAt={request.createdAt}
						phoneNumber={request?.phoneNumber}
						index={index}
						setData={setUserData}
						setTitle={setTitle}
						setShowModal={setShowModal}
						rejectUser={rejectUser}
					/>
				))}
			</div>
			{showModal && (
				<Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={showModal} onClose={closeModal}>
					<ApproveUser
						t={t}
						data={userData}
						permissions={permissions}
						addresses={addresses}
						isAddNewUser={false}
						onSuccess={(data) => {
							acceptApproval(data);
							closeModal();
						}}
						handleClose={closeModal}
						setData={setUserData}
						defaultRoles={defaultRoles}
					/>
				</Dialog>
			)}
		</section>
	);
}
