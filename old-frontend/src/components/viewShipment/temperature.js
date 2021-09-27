import React, { useState } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
//import './style.scss'

const Chart = (props) => {
  return (
    <div>
      <LineChart
        colors={["#FA7923", "#666"]}
        id="users-chart" height="220px"
        data={props.lastTenIotShipmentData}
      />
    </div>
  );
};
export default Chart;
