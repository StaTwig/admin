import React from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import "./style.scss";

const Chart = (props) => {
  return (
    <div>
      <LineChart
        colors={["#FA7923", "#666"]}
        id='users-chart'
        height='220px'
        data={props.lastTemperatureData}
        labels={"Temp"}
        ytitle='Temperature'
        xtitle='Time'
        min={30}
        max={40}
      />
    </div>
  );
};
export default Chart;
