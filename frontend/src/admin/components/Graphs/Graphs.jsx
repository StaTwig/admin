import React from "react";
import AreaChart from "./AreaChart/AreaChart";
import BarChart from "./BarChart/BarChart";
import ColumnChart from "./ColumnChart/ColumnChart";
import "./Graphs.css";

export default function Graphs({ type, title, role, color }) {
  return (
    <div className="admin--Graphs-container">
      <div className="admin--graph-header">
        <h1 className="vl-subheading f-500 vl-grey-sm">{title}</h1>
      </div>
      <div className="admin--graph-body">
        {role === "org" && type === "area" && <AreaChart />}
        {role === "org" && type === "bar" && <BarChart />}

        {role === "statwig" && type === "column" && (
          <ColumnChart color={color} />
        )}
      </div>
    </div>
  );
}
