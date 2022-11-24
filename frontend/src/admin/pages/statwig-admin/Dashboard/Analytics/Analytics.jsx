import React from "react";
import "./Analytics.css";
import AnalyticsCard from "../../../../common/AnalyticsCard/AnalyticsCard";
import Graphs from "../../../../components/Graphs/Graphs";

export default function Analytics({ t }) {
  return (
    <section className="Analytics-area">
      <div className="analytics-one-column-layout">
        <AnalyticsCard t={t} layout="type1" name="orgs" />
      </div>
      <div className="analytics-two-column-layout">
        <AnalyticsCard
          t={t}
          layout="type3"
          icon="fa-thumbs-up"
          value="500"
          valueTitle={t("no_of_track")}
          bgColor="analytic-bg-1"
          textColor="analytic-text-1"
        />
        <AnalyticsCard
          t={t}
          layout="type3"
          icon="fa-rocket"
          value="$ 102.5M"
          valueTitle={t("total_revenue")}
          bgColor="analytic-bg-2"
          textColor="analytic-text-2"
        />
      </div>
      <div className="analytics-full-column-layout">
        <Graphs
          t={t}
          role="statwig"
          type="column"
          title={t("org_receive_graph")}
          color="1"
        />
      </div>
      <div className="analytics-full-column-layout">
        <Graphs
          t={t}
          role="statwig"
          type="column"
          title={t("org_receive_graph")}
          color="2"
        />
      </div>
    </section>
  );
}
