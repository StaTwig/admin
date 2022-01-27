import React from "react";
import CurrentTemperature from "../../assets/icons/CurrentTemperature.svg";
import zoomInIcon from "../../assets/icons/chain-icon.png";
import FullscreenOutlined from "@mui/icons-material/FullscreenOutlined";

export default function Summary(props) {
  const currentTemperature = props.averageTemperature;
  const lastUpdateTime = props.lastUpdated;
  return (
    <div className='d-flex justify-content-between mb-4 p-relative'>
      <div className='row ml-4 mb-2'>
        <img
          style={{ width: "2rem", height: "3.5rem" }}
          className='temperature-icon mr-2'
          src={CurrentTemperature}
          alt='Current Temperature'
        />
        <div className='d-flex flex-column'>
          <div className='info'>Average temperature</div>
          <div className='temp'>
            {currentTemperature ? currentTemperature : 0}
            {""}
            °C
          </div>
        </div>
      </div>
      <div style={{ gap: "2rem" }} className='d-flex'>
        <div className='d-flex'>
          <img
            style={{ width: "3.5rem", height: "3.5rem" }}
            className='temperature-icon mr-2'
            src={zoomInIcon}
            alt='Zoom in'
          />
          <div className='current-info'>
            <div className='info'>Last Updated on</div>
            <div
              className='info'
              style={{ fontSize: "13px", marginTop: "1rem" }}
            >
              {lastUpdateTime ? lastUpdateTime : new Date().toLocaleString()}
            </div>
          </div>
        </div>
        <div className='icon-container'>
          <FullscreenOutlined className='icon-gmr' />
        </div>
      </div>
    </div>
  );
}
