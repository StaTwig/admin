import React from "react";
import { useHistory } from "react-router";
import "./AnalyticTiles.css";

export default function AnalyticTiles({ variant, title, stat, link, layout }) {
  const history = useHistory();

  const handleClick = () => {
    if(link) {
      history.push(link);
    }
  }

  return (
    <>
      {layout === "1" && (
        <div className={`AnalyticTiles--container tile-variant-${variant}`}>
          <div className="AnalyticTiles-insideWrapper">
            <div className="stats-content-wrappe vl-light">
              <p className="vl-subheading f-500 vl-light">{title}</p>
              <h1 className="vl-title f-700">{stat}</h1>
            </div>
            <div className="action-content-wrapper">
              <button onClick={handleClick} className={`Analytic-btn tile-btn-variant-${variant}`}>
                View
              </button>
            </div>
          </div>
        </div>
      )}

      {layout === "2" && (
        <div
          className={`AnalyticTiles--container tile-variant-${variant} vl-cursor-pointer `}
        >
          <div className="AnalyticTiles-insideWrapper">
            <div className="stats-content-wrappe vl-light">
              <p className="vl-note f-500 vl-light">{title}</p>
              <h1 className="vl-title f-700">{stat}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
