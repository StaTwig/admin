import React, { useEffect } from "react";
import "./Pendings.css";
import { getRequestsPending } from "../../../../actions/organisationActions";
import { useDispatch, useSelector } from "react-redux";
function PendingCard({userName, orgName, createdAt, emailId, region, country, postalAddress}) {
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
          <p className="vl-body f-500 vl-black">Email:</p>
          <p className="vl-body f-500 vl-grey-sm">{emailId}</p>
        </div>
        <div className="pc-body-two-space">
          <div className="pc-body-grid">
            <p className="vl-body f-500 vl-black">Region:</p>
            <p className="vl-body f-500 vl-grey-sm">{region}</p>
          </div>
          <div className="pc-body-grid">
            <p className="vl-body f-500 vl-black">Country:</p>
            <p className="vl-body f-500 vl-grey-sm">{country}</p>
          </div>
        </div>
        <div className="pc-body-col-space">
          <p className="vl-body f-500 vl-black">Organization Address :</p>
          <p className="vl-body f-500 vl-grey-sm">
            {postalAddress}
          </p>
        </div>
      </div>
      <div className="pendingcard-action vl-flex vl-gap-sm">
        <button className="vl-btn vl-btn-sm vl-btn-accept">Accept</button>
        <button className="vl-btn vl-btn-sm vl-btn-reject">Reject</button>
      </div>
    </div>
  );
}

export default function Pendings() {
 const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestsPending());
  }, [dispatch])
  const { requestPending } = useSelector((state) => state.organisationReducer);
  console.log(requestPending)
  return (
    <section className="pending-container">
      <div className="pending-header">
        <h1 className="vl-subheading f-700 vl-black">Pending Approvals</h1>
        <div className="number-label">{requestPending.length || 0}</div>
      </div>
      <div className="pending-body">
        {requestPending.map((request) =>
         <PendingCard
        emailId={request.emailId}
        region={request?.orgDetails?.region}
        country={request?.orgDetails?.country}
        postalAddress={request?.orgDetails?.postalAddress}
        orgName={request?.orgDetails?.name}
        key={request.id} userName={`${request.firstName} ${request.lastName}`} organisationId={request.organisationId} createdAt={request.createdAt}/>)}
      </div>
    </section>
  );
}
