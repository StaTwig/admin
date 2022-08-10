import React from "react";
import "./CurrentLocation.scss";
import TrackLocationCard from "./LocationCard";

export default function CurrentLocation({currentLocationData}) {
  return (
    <div>
      {currentLocationData && Object.keys(currentLocationData).map((key, index) => (
        <div key={index} style={{marginTop: "10px"}}>
          <TrackLocationCard warehouse={currentLocationData[key][0]} />
        </div>
      ))}
    </div>
  );
}
