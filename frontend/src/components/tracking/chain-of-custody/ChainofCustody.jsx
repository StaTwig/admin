import React from "react";
import ChainGroup from "./ChainGroup";
import "./ChainofCustody.scss";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

export default function ChainofCustody() {
  return (
    <div className="chain-of-custody-container">
      <div className="chain-level-1">
        <div className="null-space"></div>
        <ChainGroup />
      </div>
      <div className="chain-level-2">
        <div className="null-space"></div>
        <ChainGroup />
      </div>
      <div className="chain-level-3">
        <div className="null-space"></div>
        <ChainGroup />
      </div>
      <div className="chain-level-3">
        <div className="null-space"></div>
        <ChainGroup bar={true} />
      </div>
      <div className="chain-level-3">
        <div className="null-space"></div>
        <ChainGroup bar={true} />
      </div>
    </div>
  );
}
