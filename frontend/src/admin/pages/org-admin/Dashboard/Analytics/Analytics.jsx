import React from "react";
import "./Analytics.css";
import AnalyticsCard from "../../../../common/AnalyticsCard/AnalyticsCard";

export default function Analytics() {
  return (
    <section className="Analytics-area">
      <div className="analytics-one-column-layout">
        <AnalyticsCard layout="type1" />
      </div>
      <div className="analytics-two-column-layout">
        <AnalyticsCard
          layout="type3"
          icon="fa-thumbs-up"
          value="500"
          valueTitle="No. Units Tracked"
          bgColor="analytic-bg-1"
          textColor="analytic-text-1"
        />
        <AnalyticsCard
          layout="type3"
          icon="fa-rocket"
          value="$ 102.5M"
          valueTitle="Total Revenue"
          bgColor="analytic-bg-2"
          textColor="analytic-text-2"
        />
      </div>
    </section>
  );
}
