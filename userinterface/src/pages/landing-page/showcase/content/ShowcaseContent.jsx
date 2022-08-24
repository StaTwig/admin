import React from "react";
import "./ShowcaseContent.css";

export default function ShowcaseContent({ handleClickOpen }) {
  return (
    <section className="showcase-content-container">
      <div className="content-space">
        <h1 className="mi-title f-700 mi-white title-max-space">
          Bringing visibility for your products in emerging markets
        </h1>
        <h2 className="mi-subtitle f-400 mi-white subtitle-max-space">
          Revolutionize your Supply Chain with Blockchain Technology
        </h2>
      </div>
      <div className="call-to-action">
        <div
          className="mi-btn mi-btn-sm mi-btn-primary"
          onClick={handleClickOpen}
        >
          Request For Demo
        </div>
      </div>
    </section>
  );
}
