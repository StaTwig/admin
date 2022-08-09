import React from "react";
import ChainGroup from "./ChainGroup";
import "./ChainofCustody.scss";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

export default function ChainofCustody({trackingData}) {
  return (
    <div className="chain-of-custody-container">
      {trackingData?.trackedShipment?.map((element, index) => (
        <div key={index} className="chain-level-1" style={{"gridTemplateColumns": `${index*1.5}rem 1fr`}}>
          <div className="null-space"></div>
          <ChainGroup shipmentData={element} />
        </div>
      ))}
    </div>
  );
}
