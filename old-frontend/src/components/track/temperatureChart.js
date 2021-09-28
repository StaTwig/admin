import React from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';

const Chart = (props) => {
  return (
    <div className="col-12">
      <LineChart
        colors={["#FA7923", "#666"]}
        id="users-chart" height={props.height || '450px'}
        data={props.allIotShipmentData}
      />
    </div>
  );

};
export default Chart;
