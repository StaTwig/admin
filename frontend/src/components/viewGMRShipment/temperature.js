import React, { useState } from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import "./style.scss";
import ArrowBack from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForward from "@mui/icons-material/ArrowForwardIosRounded";
import { temperatureGraph } from "../../actions/shipmentActions";

const Chart = (props) => {
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(0);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const handlePrevHistory = () => {
    setPage(parseInt(page) + 1);
  };
  const handleNextHistory = () => {
    setPage(parseInt(page) - 1);
  };
  async function fetchData(success, fail) {
    const result = await temperatureGraph(props.shipmentId, page);
    if (result.success) {
      success(result.data.graph);
      setPage(result.data.page);
      setNextPage(result.data.nextPage);
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
          style={{ height: "300px" }}
        >
          <div className='d-flex justify-content-between mb-4 p-relative'>
            {nextPage ? (
              <div
                className='icon-container-alt left-arrow'
                onClick={handlePrevHistory}
              >
                <ArrowBack className='icon-gmr' />
              </div>
            ) : null}
            {page > 1 ? (
              <div className='icon-container-alt right-arrow'>
                <ArrowForward
                  className='icon-gmr'
                  onClick={handleNextHistory}
                />
              </div>
            ) : null}
          </div>
          <LineChart
            colors={["#FA7923", "#666"]}
            id='users-chart'
            height='240px'
            ytitle='Temperature  °C'
            xtitle='Time'
            min={min}
            max={max}
            precision={4}
            data={fetchData}
            refresh={60}
          />
        </div>
      </div>
    </>
  );
};
export default Chart;
