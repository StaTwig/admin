import React from "react";
import "./Newscard.css";

export default function Newscard({ Image, title, content, url, t }) {
  return (
    <section className="newscard-section">
      <figure className="newscard-logo">
        <img src={Image} alt="news" className="newscard-logo-image" />
      </figure>
      <div className="newscard-content">
        <p className="vl-subheading vl-line-md vl-grey-md">
          <span className="f-500 vl-black">{title}</span>
          {t(content)}
        </p>
        <div className="call-to-action">
          <div className="vl-btn vl-btn-sm vl-btn-secondary">
            {t("explore")}
          </div>
        </div>
      </div>
    </section>
  );
}
