import React from "react";
import ServiceCard from "./service-card/ServiceCard";
import "./Services.css";

import service from "./data/service";

export default function Services() {
  return (
    <section className="service-section section-space">
      <div className="mi-page-container">
        <div className="section-headers">
          <h1 className="mi-heading f-500 mi-black">Our Services</h1>
        </div>
        <div className="service-card-container">
          {service.map((card) => (
            <ServiceCard
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
