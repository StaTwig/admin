import React from "react";
import { useTranslation } from "react-i18next";
import "./AnalyticTiles.css";

export default function AnalyticTiles({
  variant,
  title,
  stat,
  layout,
  onClick,
  name,
}) {
  const { t } = useTranslation();

  const handleClick = () => {
    if (name) {
      onClick(name);
    }
  };

  return (
    <>
      {layout === "1" && (
        <div className={`AnalyticTiles--container tile-variant-${variant}`}>
          <div className='AnalyticTiles-insideWrapper'>
            <div className='stats-content-wrappe vl-light'>
              <p className='vl-subheading f-500 vl-light'>{title}</p>
              <h1 className='vl-title f-700'>{stat}</h1>
            </div>
            <div className='action-content-wrapper'>
              <button
                onClick={handleClick}
                className={`Analytic-btn tile-btn-variant-${variant}`}
              >
                {t("view")}
              </button>
            </div>
          </div>
        </div>
      )}

      {layout === "2" && (
        <div
          className={`AnalyticTiles--container tile-variant-${variant} vl-cursor-pointer `}
        >
          <div className='AnalyticTiles-insideWrapper'>
            <div className='stats-content-wrappe vl-light'>
              <p className='vl-note f-500 vl-light'>{title}</p>
              <h1 className='vl-title f-700'>{stat}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
