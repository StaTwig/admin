import React from "react";
import Analytics from "./Analytics/Analytics";
import "./OrgDashboard.css";
import Pendings from "./Pendings/Pendings";
import "../../../assets/styles/index.css";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";

export default function OrgDashboard() {
  return (
    <>
      <OrgHeader />
      <section className="admin-page-layout">
        <div className="admin-container">
          <div className="admin-dashboard-container admin-section-space">
            <div className="dashboard-left-space">
              <Analytics />
            </div>
            <div className="dashboard-right-space">
              <Pendings />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
