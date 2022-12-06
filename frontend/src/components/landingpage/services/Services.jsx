import React from "react";
import ServiceCard from "./service-card/ServiceCard";
import "./Services.css";

import service from "./data/service";

export default function Services({ serviceRef, t }) {
  return (
    <section
      className="service-section section-space"
      ref={serviceRef}
      style={{ scrollMargin: "70px" }}
    >
      <div className="vl-page-container">
        <div className="section-headers">
          <h1 className="vl-heading f-500 vl-black">{t("our_service")}</h1>
        </div>
        <div className="service-card-container">
          {service.map((card) => (
            <ServiceCard
              t={t}
              key={card.id}
              Image={card.image}
              title={card.title}
              content={card.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
