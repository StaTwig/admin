import React from "react";
import "./Features.css";
import Newscard from "./news-card/Newscard";
import Bar from "../../../assests/files/images/features/bars.png";

import feature from "./data/feature";

export default function Features() {
  return (
    <section className="features-section section-space bg-grey">
      <div className="mi-page-container">
        <div className="feature-two-column-grid-container">
          <div className="feature-left-container">
            <hgroup className="feature-heading-groups">
              <h1 className="mi-heading f-700 mi-white mi-line-xl">
                Connecting various stakeholders on VaccineLedger to give
                continous visibility in your Extended Supply Chain
              </h1>
              <h2 className="mi-subtitle f-500 mi-white mi-line-md">
                Built on the foundation of Trust, Transaparency and Authenticity
              </h2>
            </hgroup>

            <img src={Bar} alt="bar" className="bar-space-image" />
          </div>
          <div className="feature-right-container">
            {feature.map((card) => (
              <Newscard
                key={card.id}
                Image={card.image}
                title={card.title}
                content={card.content}
                url={card.url}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
