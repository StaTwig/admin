import React from "react";
import ChainCard from "./ChainCard";

export default function ChainGroup({ bar }) {
  return (
    <div className="chain-group">
      <div className="mark-space">
        <div className="marker-circle"></div>
        <div className={`line-straight ${bar && "bar-none"}`}></div>
        <div className="line-cross"></div>
      </div>
      <ChainCard />
    </div>
  );
}
