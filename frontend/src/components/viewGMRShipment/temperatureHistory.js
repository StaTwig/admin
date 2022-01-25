import React, { useState } from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import "./style.scss";
import ArrowBack from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForward from "@mui/icons-material/ArrowForwardIosRounded";
import { temperatureGraph } from "../../actions/shipmentActions";
const ChartHistory = (props) => {
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(0);
  const [page, setPage] = useState(1);
  async function fetchData(success, fail) {
    const result = await temperatureGraph(props.shipmentId, page);
    if (result.success) {
      success(result.data.graph);
      setPage(result.data.page);
      if (min > result.data.metaData.min) {
        setMin(result.data.metaData.min);
      }
      if (max < result.data.metaData.max) {
        setMax(result.data.metaData.max);
      }
    } else {
      fail(result.message);
    }
  }
  return (
    <>
      <div className='row mb-4 mt-0'>
        <div
          className='col panel commonpanle align-middle'
          style={{ height: "360px" }}
        >
          <div className='d-flex justify-content-between mb-4 p-relative'>
            <div className='icon-container-alt left-arrow'>
              <ArrowBack className='icon-gmr' />
            </div>
            <div className='icon-container-alt right-arrow'>
              <ArrowForward className='icon-gmr' />
            </div>
          </div>
          <LineChart
            colors={["#FA7923", "#666"]}
            id='users-chart'
            height='240px'
            ytitle='Temperature'
            xtitle='Time'
            min={min}
            max={max}
            precision={2}
            data={fetchData}
          />
        </div>
      </div>
    </>
  );
};
export default ChartHistory;
