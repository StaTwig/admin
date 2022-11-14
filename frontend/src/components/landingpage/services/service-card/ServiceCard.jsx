import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ Image, title, content, t }) {
  return (
    <section className="service-card">
      <div className="service-icon">
        <img src={Image} alt="service" />
      </div>
      <h1 className="vl-subtitle vl-grey-md vl-line-md f-700">{t(title)}</h1>
      <p className="vl-subheading f-400 vl-grey-sm">{t(content)}</p>
    </section>
  );
}
