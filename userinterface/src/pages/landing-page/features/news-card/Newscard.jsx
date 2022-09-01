import React from "react";
import "./Newscard.css";

export default function Newscard({ Image, title, content, url }) {
  return (
    <section className="newscard-section">
      <figure className="newscard-logo">
        <img src={Image} alt="news" className="newscard-logo-image" />
      </figure>
      <div className="newscard-content">
        <p className="mi-subheading mi-line-md mi-grey-md">
          <span className="f-500 mi-black">{title}</span>
          {content}
        </p>
        <div className="call-to-action">
          <div className="mi-btn mi-btn-sm mi-btn-secondary">Explore More</div>
        </div>
      </div>
    </section>
  );
}
