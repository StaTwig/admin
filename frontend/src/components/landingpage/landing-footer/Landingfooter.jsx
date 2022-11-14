import React from "react";
import "./Landingfooter.css";
import Statwig from "../../../assets/files/logos/statwig-logo.png";
import googlestore from "../../../assets/files/images/social/googlestore.png";
import appstore from "../../../assets/files/images/social/appstore.png";
import { Link } from "react-router-dom";

export default function Landingfooter({ contactRef, t }) {
  return (
    <>
      <div className="footer-section section-space bg-blue" ref={contactRef}>
        <div className="vl-page-container">
          <div className="footer-four-column-layout">
            <div className="powered-column">
              <h1 className="vl-subtitle f-500 vl-black">{t("power_by")}</h1>
              <div className="footer-content-area">
                <figure className="company-logo">
                  <img
                    src={Statwig}
                    alt="statwig"
                    className="company-logo-image"
                  />
                </figure>
                <figure className="mobile-app-stores">
                  <a
                    href="https://apps.apple.com/us/app/vaccineledger-lite/id1565684295"
                    target="_blank"
                  >
                    <img
                      src={appstore}
                      alt="store"
                      className="mobile-store-icons"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.thevaccineledger"
                    target="_blank"
                  >
                    <img
                      src={googlestore}
                      alt="store"
                      className="mobile-store-icons"
                    />
                  </a>
                </figure>
              </div>
            </div>
            <div className="address-column">
              <h1 className="vl-subtitle f-500 vl-black">{t("office_addr")}</h1>
              <div className="footer-content-area">
                <div className="address-card">
                  <p className="vl-subheading f-700 vl-grey-md">India</p>
                  <article className="full-address">
                    <p className="vl-body f-400 vl-grey-sm">
                      T-Hub, IIIT-Hyderabad, Gachibowli, Hyderabad, Telangana,
                    </p>
                    <p className="vl-body f-400 vl-grey-sm">India – 500032</p>
                  </article>
                </div>
                <div className="address-card">
                  <p className="vl-subheading f-700 vl-grey-md">Singapore</p>
                  <article className="full-address">
                    <p className="vl-body f-400 vl-grey-sm">
                      3 Fraser Street #05-25,
                    </p>
                    <p className="vl-body f-400 vl-grey-sm">
                      Duo Tower, Singapore - 189352
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div className="contact-column">
              <h1 className="vl-subtitle f-500 vl-black">{t("contact")}</h1>
              <div className="footer-content-area">
                <section className="contact-group">
                  <article className="contact-card">
                    <div className="contact-heading">
                      <i className="fa-solid fa-phone vl-grey-sm vl-icon-xs"></i>
                      <p className="vl-body f-400 vl-grey-sm">
                        {t("phone_no")} :
                      </p>
                    </div>
                    <p className="vl-body f-400 vl-grey-sm">
                      (+91) 939 059 0319
                    </p>
                  </article>
                  <article className="contact-card">
                    <div className="contact-heading">
                      <i className="fa-solid fa-envelope vl-grey-sm vl-icon-xs"></i>
                      <p className="vl-body f-400 vl-grey-sm">{t("email")} :</p>
                    </div>
                    <p className="vl-body f-400 vl-grey-sm">info@statwig.com</p>
                  </article>
                </section>
              </div>
              <h1 className="vl-subtitle f-500 vl-black top-space">
                {t("help_center")}
              </h1>
              <div className="footer-content-area">
                <section className="contact-group">
                  <p className="vl-body f-400 vl-grey-sm">{t("faq")}</p>
                  <p className="vl-body f-400 vl-grey-sm">{t("terms&con")}</p>
                </section>
              </div>
            </div>
            <div className="support-column">
              <h1 className="vl-subtitle f-500 vl-black">{t("follow")}</h1>
              <div className="footer-content-area">
                <div className="call-to-action">
                  <Link
                    to={{
                      pathname: "https://gitlab.com/statwig-public/theledger",
                    }}
                    target="_blank"
                  >
                    <button className="vl-btn vl-btn-sm vl-btn-primary">
                      <div className="contact-heading">
                        <i className="fa-brands fa-gitlab"></i>
                        <p className="vl-body f-400"> {t("git_repo")}</p>
                      </div>
                    </button>
                  </Link>
                </div>

                {/* <ul className="social-media-list">
                  <li className="social-items">
                    <Link to="/" className="footer-social-icon vl-link">
                      <i className="fa-brands fa-linkedin"></i>
                    </Link>
                  </li>
                  <li className="social-items">
                    <Link to="/" className="footer-social-icon vl-link">
                      <i className="fa-brands fa-square-gitlab"></i>
                    </Link>
                  </li>
                  <li className="social-items">
                    <Link to="/" className="footer-social-icon vl-link">
                      <i className="fa-brands fa-square-twitter"></i>
                    </Link>
                  </li>
                  <li className="social-items">
                    <Link to="/" className="footer-social-icon vl-link">
                      <i className="fa-brands fa-square-facebook"></i>
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="copy-section bg-blue">
        <div className="vl-page-container">
          <article className="copy-rights ">
            <p className="vl-body f-400">{t("copy_rights")}</p>
          </article>
        </div>
      </section>
    </>
  );
}
