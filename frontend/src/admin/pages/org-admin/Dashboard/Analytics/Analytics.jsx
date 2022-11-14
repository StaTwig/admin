import React from "react";
import "./Analytics.css";
import AnalyticsCard from "../../../../common/AnalyticsCard/AnalyticsCard";
import Graphs from "../../../../components/Graphs/Graphs";

export default function Analytics() {
  return (
    <section className="Analytics-area">
      <div className="analytics-one-column-layout">
        <AnalyticsCard layout="type2" />
      </div>
      <div className="analytics-full-column-layout">
        <Graphs
          role="org"
          type="area"
          title="Orders Generated VS Shipments Received"
        />
      </div>
      <div className="analytics-full-column-layout">
        <Graphs
          role="org"
          type="bar"
          title="Orders Received VS Shipments Delivered"
        />
      </div>
    </section>
  );
}
