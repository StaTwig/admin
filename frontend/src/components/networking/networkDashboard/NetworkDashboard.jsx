import React from "react";
import ManufacturerHeader from "./manufacturerHeader/ManufacturerHeader.jsx";
import "./NetworkDashboard.scss";
import OtherLocations from "./otherLocations/OtherLocations";
import TopSeller from "./topSeller/TopSeller";

const NetworkDashboard = ({ setMobileDashboard }) => {
  return (
    <div className="network-sidebar-container">
      <div className="dashboard-card">
        <ManufacturerHeader setMobileDashboard={setMobileDashboard} />
      </div>
      <div className="dashboard-card">
        <TopSeller />
      </div>
      <div className="dashboard-card">
        <OtherLocations />
      </div>
    </div>
  );
};

export default NetworkDashboard;
