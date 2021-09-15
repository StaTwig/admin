import React, { useState, useEffect } from "react";
import { LineChart } from "react-chartkick";
import "chart.js";
import { getTemperature } from "../../actions/shipmentActions";

const Chart = () => {
  const [temp, setTemp] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchData() {
        const result = await getTemperature();
        setTemp(result.data);
      }
      fetchData();
    }, 5000);
    return () => {
      window.clearInterval(interval); // clear the interval in the cleanup function
    };
  }, []);

  return (
    <div>
      <LineChart
        ymin='-5'
        ymax='10'
        min={-5}
        max={10}
        colors={["#FA7923", "#666"]}
        data={temp}
      />
    </div>
  );
};
export default Chart;
