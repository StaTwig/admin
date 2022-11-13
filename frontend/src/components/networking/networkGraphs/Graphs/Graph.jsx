import React from "react";
import { AreaChart, ColumnChart } from "react-chartkick";
import "chartkick/chart.js";

export default function Graph({ graph, data }) {
  return (
    <>
      {graph === "bigbar" && (
        <ColumnChart
          data={data}
          xtitle="Days"
          ytitle="Quantity"
          dataset={{ borderRadius: 20, borderWidth: 0 }}
          colors={["#FB7185", "#2DD4BF", "#818CF8"]}
          ymin="0"
          ymax="1000"
        />
      )}
      {graph === "bar" && (
        <ColumnChart
          data={data}
          xtitle="Days"
          ytitle="Quantity"
          dataset={{ borderRadius: 5, borderWidth: 0 }}
          colors={["#FB7185", "#2DD4BF"]}
        />
      )}

      {graph === "area" && (
        <AreaChart
          data={data}
          min={0}
          max={10000}
          xtitle="Days"
          ytitle="Quantity"
          colors={["#2DD4BF"]}
        />
      )}
    </>
  );
}
