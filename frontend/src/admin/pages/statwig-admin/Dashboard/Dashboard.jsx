import React from "react";
import StatwigHeader from "../../../shared/Header/StatwigHeader/StatwigHeader";
import Analytics from "./Analytics/Analytics";
import "./Dashboard.css";
import Pendings from "./Pendings/Pendings";

export default function Dashboard() {
  return (
    <>
      <StatwigHeader />
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
