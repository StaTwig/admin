import React, { useEffect, useState } from "react";
import { AreaChart } from "react-chartkick";
import "chartkick/chart.js";
import "./style.scss";
import { getDriverGraph } from "../../actions/shipmentActions";

const DriverGraph = (props) => {
  const [avg, setAvg] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const result = await getDriverGraph(props.shipmentId);
      setAvg(parseInt(result.data.averageTripScore));
    }
    fetchData();
  }, [props.shipmentId]);
  async function fetchData(success, fail) {
    const result = await getDriverGraph(props.shipmentId);
    if (result.success) {
      success(result.data.tripDetails);
    } else {
      fail(result.message);
    }
  }
  return (
    <>
      <div className='row'>
        <div
          className='col panel commonpanle align-middle'
          style={{ height: "320px" }}
        >
          <div className='panel-heading'>
            {avg ? (
              <h6 className='panel-title pl-2 pb-4'>
                Average Trip Score : {parseInt(avg) || "N/A"}
              </h6>
            ) : null}
          </div>
          <AreaChart
            colors={["#2596be", "#666"]}
            id='users-chart'
            height='240px'
            ytitle='Driver Score'
            xtitle='Trips'
            data={fetchData}
            refresh={60}
          />
        </div>
      </div>
    </>
  );
};
export default DriverGraph;
