import React from "react";
import ShowcaseContent from "./content/ShowcaseContent";
import Illustration from "../../../assets/files/images/illustration/illustration.png";
import Vaccine from "../../../assets/files/images/illustration/vaccine.png";

import "./Showcase.css";
import AccessForm from "./access-form/AccessForm";

export default function Showcase({ handleClickOpen }) {
  return (
    <section className="showcase-section section-space">
      <div className="vl-page-container">
        <div className="showcase-two-column-grid-layout">
          <article className="grid-content-column">
            <ShowcaseContent handleClickOpen={handleClickOpen} />
            <img
              src={Vaccine}
              alt="Illustration"
              className="illustration-vector"
            />
          </article>
          <article className="grid-form-column">
            <AccessForm />
          </article>
        </div>
      </div>
    </section>
  );
}
