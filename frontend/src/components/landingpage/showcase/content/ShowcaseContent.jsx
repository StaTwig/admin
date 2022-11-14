import React from "react";
import "./ShowcaseContent.css";

export default function ShowcaseContent({ handleClickOpen, t }) {
  return (
    <section className="showcase-content-container">
      <div className="content-space">
        <h1 className="vl-title f-700 vl-white title-max-space">
          {t("showcase-heading")}
        </h1>
        <h2 className="vl-subtitle f-400 vl-white subtitle-max-space">
          {t("showcase-sub-heading")}
        </h2>
      </div>
      <div className="call-to-action">
        <button
          className="vl-btn vl-btn-sm vl-btn-primary"
          onClick={handleClickOpen}
        >
          {t("request_for_demo")}
        </button>
      </div>
    </section>
  );
}
