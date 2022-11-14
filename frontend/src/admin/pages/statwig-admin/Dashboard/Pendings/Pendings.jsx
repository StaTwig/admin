import React from "react";
import { updateOrg } from "../../../../actions/organisationActions";
import "./Pendings.css";

function PendingCard({ organisation, updateOrgStatus }) {
	return (
		<div className="pendingCard-container">
			<div className="pendingcard-header">
				<div className="pc-name-space">
					<p className="vl-subheading f-500 vl-blue">{organisation.name}</p>
					<p className="vl-small f-400 vl-grey-xs">
						{new Date(organisation.createdAt).toLocaleDateString()}
					</p>
				</div>
				{/* <div className="organization-name">
					<p className="vl-body f-500 vl-black">{organisation.type}</p>
				</div> */}
			</div>
			<div className="pendingcard-body">
				<div className="pc-body-grid">
					<p className="vl-body f-500 vl-black">Type:</p>
					<p className="vl-body f-500 vl-grey-sm">{organisation.type}</p>
				</div>
				<div className="pc-body-two-space">
					<div className="pc-body-grid">
						<p className="vl-body f-500 vl-black">Region:</p>
						<p className="vl-body f-500 vl-grey-sm">{organisation.region}</p>
					</div>
					<div className="pc-body-grid">
						<p className="vl-body f-500 vl-black">Country:</p>
						<p className="vl-body f-500 vl-grey-sm">{organisation.country}</p>
					</div>
				</div>
				<div className="pc-body-col-space">
					<p className="vl-body f-500 vl-black">Organization Address :</p>
					<p className="vl-body f-500 vl-grey-sm">{organisation.postalAddress}</p>
				</div>
			</div>
			<div className="pendingcard-action vl-flex vl-gap-sm">
				<button
					onClick={() => updateOrgStatus(organisation, true)}
					className="vl-btn vl-btn-sm vl-btn-accept"
				>
					Accept
				</button>
				<button
					onClick={() => updateOrgStatus(organisation, true)}
					className="vl-btn vl-btn-sm vl-btn-reject"
				>
					Reject
				</button>
			</div>
		</div>
	);
}

export default function Pendings(props) {
	const { pendingOrgs, refetchOrgs } = props;

	const updateOrgStatus = async (data, approve) => {
    try {
      const payload = {
        id: data.id,
        status: approve ? "ACTIVE" : "REJECTED",
        type: data.type,
      };
  
      const result = await updateOrg(payload);
      if (result.status === 200) {
        console.log("Org updated successfully!");
        refetchOrgs();
      } else {
        console.log("Error in updating org!");
      }
    } catch(err) {
      console.log(err);
    }
	};

	return (
		<section className="pending-container">
			<div className="pending-header">
				<h1 className="vl-subheading f-700 vl-black">Pending Approvals</h1>
				<div className="number-label">16</div>
			</div>
			<div className="pending-body">
				{pendingOrgs.map((pendingOrg) => (
					<PendingCard organisation={pendingOrg} updateOrgStatus={updateOrgStatus} />
				))}
			</div>
		</section>
	);
}
