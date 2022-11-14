import React from "react";
import "./Client.css";
import Client1 from "../../../assets/files/images/client/client1.jpg";
import Client2 from "../../../assets/files/images/client/client2.jpg";
import Client3 from "../../../assets/files/images/client/client3.jpg";
import Client4 from "../../../assets/files/images/client/client4.jpg";
import Client5 from "../../../assets/files/images/client/client5.jpg";
import Client6 from "../../../assets/files/images/client/client6.jpg";
import Client7 from "../../../assets/files/images/client/client7.png";
import Client8 from "../../../assets/files/images/client/client8.jpg";

export default function Client({ t }) {
  return (
    <section className="client-section section-space">
      <div className="vl-page-container">
        <div className="section-headers">
          <h1 className="vl-heading f-500 vl-black">{t("our_partner")}</h1>
        </div>
        <div className="client-container">
          <figure className="client-card">
            <img src={Client1} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client2} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client3} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client4} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client5} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client6} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client7} alt="client" />
          </figure>
          <figure className="client-card">
            <img src={Client8} alt="client" />
          </figure>
        </div>
      </div>
    </section>
  );
}
