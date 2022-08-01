import React from "react";
import ChainGroup from "./ChainGroup";
import "./ChainofCustody.scss";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

export default function ChainofCustody() {
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
      bar: true,
    },
    {
      id: 3,
      bar: true,
    },
    {
      id: 4,
      bar: true,
    },
  ];
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
      {/* Level 3 Groups */}
      {data.map((row, index) => (
        <div className="chain-level-3">
          <div className="null-space"></div>
          <ChainGroup
            key={index}
            bar={index === 0 ? false : true}
            data={data}
            index={index}
            id={row.id}
          />
        </div>
      ))}
    </div>
  );
}
