import React from "react";
import "./Analytics.css";
import AnalyticsCard from "../../../../common/AnalyticsCard/AnalyticsCard";
import Graphs from "../../../../components/Graphs/Graphs";

export default function Analytics({ userAnalytics, t }) {
  return (
    <section className="Analytics-area">
      <div className="analytics-one-column-layout">
        <AnalyticsCard
          t={t}
          layout="type2"
          name="users"
          analytics={userAnalytics}
        />
      </div>
      <div className="analytics-full-column-layout">
        <Graphs role="org" type="area" title={t("org_receive_graph")} />
      </div>
      <div className="analytics-full-column-layout">
        <Graphs role="org" type="bar" title={t("org_receive_graph")} />
      </div>
    </section>
  );
}
