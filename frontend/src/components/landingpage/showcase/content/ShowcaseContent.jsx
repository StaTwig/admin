import React from "react";
import "./ShowcaseContent.css";

export default function ShowcaseContent({ handleClickOpen }) {
  return (
    <section className="showcase-content-container">
      <div className="content-space">
        <h1 className="vl-title f-700 vl-white title-max-space">
          Bringing visibility for your products in emerging markets
        </h1>
        <h2 className="vl-subtitle f-400 vl-white subtitle-max-space">
          Revolutionize your Supply Chain with Blockchain Technology
        </h2>
      </div>
      <div className="call-to-action">
        <button
          className="vl-btn vl-btn-sm vl-btn-primary"
          onClick={handleClickOpen}
        >
          Request For Demo
        </button>
      </div>
    </section>
  );
}
