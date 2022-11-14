import React from "react";
import "./CurrentLocation.scss";
import TrackLocationCard from "./LocationCard";
import TrackIllustration from "../../../assets/images/track.webp";
import { t } from "i18next";

export default function CurrentLocation({ currentLocationData, t }) {
  return currentLocationData ? (
    <div>
      {currentLocationData &&
        Object.keys(currentLocationData).map((key, index) => (
          <div key={index} style={{ marginTop: "10px" }}>
            <TrackLocationCard t={t} currentLocation={currentLocationData[key]} />
          </div>
        ))}
    </div>
  ) : (
    <div className="tracking-illustation">
      <img src={TrackIllustration} alt="tracking" />
      <p className="mi-body-md f-500 grey mi-reset">{t("no_track_msg")}</p>
    </div>
  );
}
