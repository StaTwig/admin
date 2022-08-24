import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ Image, title, content }) {
  return (
    <section className="service-card">
      <div className="service-icon">
        <img src={Image} alt="service" />
      </div>
      <h1 className="mi-subtitle mi-grey-md mi-line-md f-700">{title}</h1>
      <p className="mi-subheading f-400 mi-grey-sm">{content}</p>
    </section>
  );
}
