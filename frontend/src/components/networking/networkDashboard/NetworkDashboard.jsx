import React from "react";
import ManufacturerHeader from "./manufacturerHeader/ManufacturerHeader.jsx";
import "./NetworkDashboard.scss";
import OtherLocations from "./otherLocations/OtherLocations";
import TopSeller from "./topSeller/TopSeller";

const NetworkDashboard = (props) => {
  const { bestseller, inStock, manufacturer, oManufacturer, outStock, setReportWarehouse, user, setMobileDashboard } = props;

  return (
    <div className="network-sidebar-container">
      <div className="dashboard-card">
        <ManufacturerHeader user={user} manufacturer={manufacturer} oManufacturer={oManufacturer} setMobileDashboard={setMobileDashboard} />
      </div>
      <div className="dashboard-card">
        <TopSeller bestseller={bestseller} />
      </div>
      <div className="dashboard-card">
        <OtherLocations setReportWarehouse={(param) => setReportWarehouse(param)} oManufacturer={oManufacturer} user={user} />
      </div>
    </div>
  );
};

export default NetworkDashboard;
