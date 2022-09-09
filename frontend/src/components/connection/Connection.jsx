import React, { useState } from "react";
import "./Connection.css";
import Vaccineledgerlight from "../../assets/files/logos/vaccineledger-light.svg";
import VaccineLedgerLogo from "../../assets/files/logos/vaccineledger.svg";
import statwig from "../../assets/files/logos/statwig-logo.png";
import check from "../../assets/files/icons/check.svg";
import Illustration from "../../assets/files/images/illustration/illustration.png";
import Account from "./account/Account";
import Organization from "./organization/Organization";
import Verify from "./verify/Verify";
import { useParams } from "react-router-dom";

export default function Connection(props) {
  let { id } = useParams();
  console.log(id);
  const [connection] = useState(id);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const onUserDataSubmit = (data, isFinal=false) => {
    setRegisterData({...registerData, ...data});
    if(isFinal) {
      // API call to backend
      // Redirect to request pending
    }
  }

  console.log("Register data - ", registerData);

  return (
    <section className="connect-layout-container">
      <div className="connection-two-column-grid-layout">
        <div className="banner-section banner-grid-name">
          <div className="banner-inner-container">
            <div className="banner-top">
              <figure className="connection-brand-logo">
                <img src={Vaccineledgerlight} alt="Vaccineledger" />
              </figure>
              <section className="our-benefits-container">
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    Maintain your Orders
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    Real Time shipment details
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">Track & Trace</p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    View your Partner Locations
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    Alerts and Notifications
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    Monitor Cold chain conditions
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="vl-subheading f-500 vl-white">
                    Efficiently manage your inventory
                  </p>
                </article>
              </section>
            </div>
            <div className="powerby">
              <p className="vl-small f-700 vl-white">Powered by</p>
              <img src={statwig} alt="statwig" className="statwig-power-logo" />
            </div>
            <img
              src={Illustration}
              alt="Illustration"
              className="connect-Illustration"
            />
          </div>
        </div>
        <div className="main-context-section form-grid-name">
          <div className="connection-mobile-header">
            <figure className="brand-logo">
              <img
                src={VaccineLedgerLogo}
                alt="vaccineledger"
                className="brand-logo-image"
              />
            </figure>
          </div>
          <div className="connection-body-container">
            <section
              className="back-navigation vl-link vl-grey-xs"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <p className="vl-subheading f-400">Back</p>
            </section>
            <div className="login-system-layout">
              {connection === "account" && <Account onUserDataSubmit={onUserDataSubmit} />}
              {connection === "organization" && <Organization onUserDataSubmit={onUserDataSubmit} />}
              {connection === "verify" && <Verify />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
