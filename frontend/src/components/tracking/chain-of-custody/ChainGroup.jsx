import React from "react";
import ChainCard from "./ChainCard";

export default function ChainGroup({ shipmentData, bar, expanded, data, index }) {
  return (
    <div className="chain-group">
      <div className="mark-space">
        <div className="marker-circle"></div>
        <div
          className={`line-straight ${bar && "bar-none"} ${
            bar
              ? expanded === "panel1"
                ? index === shipmentData.length - 1
                  ? ""
                  : "bar-extra"
                : ""
              : ""
          }
          ${
            !bar
              ? expanded === "panel1"
                ? index === 0
                  ? "bar-top"
                  : ""
                : ""
              : ""
          }`}
        ></div>
        <div className="line-cross"></div>
      </div>
      <ChainCard shipmentData={shipmentData} />
    </div>
  );
}

// className={`line-straight ${bar && "bar-none"} ${ bar  ?  expanded === "panel1" ? index === (data.length -1) ? "" : "bar-extra"}`}
