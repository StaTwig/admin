import React from "react";
import "./Pendings.css";

function PendingCard() {
  return (
    <div className="pendingCard-container">
      <div className="pendingcard-header">
        <div className="pc-name-space">
          <p className="vl-subheading f-500 vl-blue">John Steven</p>
          <p className="vl-small f-400 vl-grey-xs">Aug 16, 2022 10:00 am </p>
        </div>
        <div className="organization-name">
          <p className="vl-body f-500 vl-black">ABC Redfort Organization </p>
        </div>
      </div>
      <div className="pendingcard-body">
        <div className="pc-body-grid">
          <p className="vl-body f-500 vl-black">Email:</p>
          <p className="vl-body f-500 vl-grey-sm">johnsteven@gmail.com</p>
        </div>
        <div className="pc-body-two-space">
          <div className="pc-body-grid">
            <p className="vl-body f-500 vl-black">Region:</p>
            <p className="vl-body f-500 vl-grey-sm">Asia</p>
          </div>
          <div className="pc-body-grid">
            <p className="vl-body f-500 vl-black">Country:</p>
            <p className="vl-body f-500 vl-grey-sm">India</p>
          </div>
        </div>
        <div className="pc-body-col-space">
          <p className="vl-body f-500 vl-black">Organization Address :</p>
          <p className="vl-body f-500 vl-grey-sm">
            IT Hub, VP road Pune Maharashtra 400096 India
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
  return (
    <section className="pending-container">
      <div className="pending-header">
        <h1 className="vl-subheading f-700 vl-black">Pending Approvals</h1>
        <div className="number-label">16</div>
      </div>
      <div className="pending-body">
        <PendingCard />
        <PendingCard />
        <PendingCard />
      </div>
    </section>
  );
}
