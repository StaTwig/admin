import React from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import "./style.scss";

const Chart = (props) => {
  return (
    <LineChart
      colors={["#FA7923", "#666"]}
      id='users-chart'
      height='240px'
      data={props.lastTemperatureData}
      ytitle='Temperature'
      xtitle='Time'
      min={props.metaData.min}
      max={props.metaData.max}
    />
  );
};
export default Chart;
