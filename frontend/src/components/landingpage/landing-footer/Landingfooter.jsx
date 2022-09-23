import React from "react";
import "./Landingfooter.css";
import Statwig from "../../../assets/files/logos/statwig-logo.png";
import googlestore from "../../../assets/files/images/social/googlestore.png";
import appstore from "../../../assets/files/images/social/appstore.png";
import { Link } from "react-router-dom";

export default function Landingfooter() {
  return (
    <>
      <div className='footer-section section-space bg-blue'>
        <div className='vl-page-container'>
          <div className='footer-four-column-layout'>
            <div className='powered-column'>
              <h1 className='vl-subtitle f-500 vl-black'>Powered By</h1>
              <div className='footer-content-area'>
                <figure className='company-logo'>
                  <img
                    src={Statwig}
                    alt='statwig'
                    className='company-logo-image'
                  />
                </figure>
                <figure className='mobile-app-stores'>
                  <img
                    src={appstore}
                    alt='store'
                    className='mobile-store-icons'
                  />
                  <img
                    src={googlestore}
                    alt='store'
                    className='mobile-store-icons'
                  />
                </figure>
              </div>
            </div>
            <div className='address-column'>
              <h1 className='vl-subtitle f-500 vl-black'>Office Address</h1>
              <div className='footer-content-area'>
                <div className='address-card'>
                  <p className='vl-subheading f-700 vl-grey-md'>India</p>
                  <article className='full-address'>
                    <p className='vl-body f-400 vl-grey-sm'>
                      T-Hub, IIIT-Hyderabad, Gachibowli, Hyderabad, Telangana,
                    </p>
                    <p className='vl-body f-400 vl-grey-sm'>India – 500032</p>
                  </article>
                </div>
                <div className='address-card'>
                  <p className='vl-subheading f-700 vl-grey-md'>Singapore</p>
                  <article className='full-address'>
                    <p className='vl-body f-400 vl-grey-sm'>
                      3 Fraser Street #05-25,
                    </p>
                    <p className='vl-body f-400 vl-grey-sm'>
                      Duo Tower, Singapore - 189352
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div className='contact-column'>
              <h1 className='vl-subtitle f-500 vl-black'>Contact Us</h1>
              <div className='footer-content-area'>
                <section className='contact-group'>
                  <article className='contact-card'>
                    <div className='contact-heading'>
                      <i className='fa-solid fa-phone vl-grey-sm vl-icon-xs'></i>
                      <p className='vl-body f-400 vl-grey-sm'>Phone :</p>
                    </div>
                    <p className='vl-body f-400 vl-grey-sm'>
                      (+91) 939 059 0319
                    </p>
                  </article>
                  <article className='contact-card'>
                    <div className='contact-heading'>
                      <i className='fa-solid fa-envelope vl-grey-sm vl-icon-xs'></i>
                      <p className='vl-body f-400 vl-grey-sm'>Email :</p>
                    </div>
                    <p className='vl-body f-400 vl-grey-sm'>info@statwig.com</p>
                  </article>
                </section>
              </div>
              <h1 className='vl-subtitle f-500 vl-black top-space'>
                Help Center
              </h1>
              <div className='footer-content-area'>
                <section className='contact-group'>
                  <p className='vl-body f-400 vl-grey-sm'>FAQ's</p>
                  <p className='vl-body f-400 vl-grey-sm'>Terms & Conditions</p>
                </section>
              </div>
            </div>
            <div className='support-column'>
              <h1 className='vl-subtitle f-500 vl-black'>Follow Us</h1>
              <div className='footer-content-area'>
                <div className='call-to-action'>
                  <Link
                    to={{
                      pathname: "https://gitlab.com/statwig-public/theledger",
                    }}
                    target='_blank'
                  >
                    <button className='vl-btn vl-btn-sm vl-btn-primary'>
                      <div className='contact-heading'>
                        <i className='fa-brands fa-gitlab'></i>
                        <p className='vl-body f-400'> Gitlab Repository</p>
                      </div>
                    </button>
                  </Link>
                </div>

                <ul className='social-media-list'>
                  <li className='social-items'>
                    <Link to='/' className='footer-social-icon vl-link'>
                      <i className='fa-brands fa-linkedin'></i>
                    </Link>
                  </li>
                  <li className='social-items'>
                    <Link to='/' className='footer-social-icon vl-link'>
                      <i className='fa-brands fa-square-gitlab'></i>
                    </Link>
                  </li>
                  <li className='social-items'>
                    <Link to='/' className='footer-social-icon vl-link'>
                      <i className='fa-brands fa-square-twitter'></i>
                    </Link>
                  </li>
                  <li className='social-items'>
                    <Link to='/' className='footer-social-icon vl-link'>
                      <i className='fa-brands fa-square-facebook'></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='copy-section bg-blue'>
        <div className='vl-page-container'>
          <article className='copy-rights '>
            <p className='vl-body f-400'>
              {" "}
              © 2022 StaTwig. All rights reserved.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
