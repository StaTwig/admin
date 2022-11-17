import React from "react";
import "./Landingheader.css";
import VaccineLedgerLogo from "../../../assets/files/logos/vaccineledger.svg";
import EnglishFlag from "../../../assets/files/images/flags/English.webp";
import SpanishFlag from "../../../assets/files/images/flags/Spanish.webp";
import { Link, useHistory } from "react-router-dom";

export default function Landingheader({
  handleNavClick,
  changeLanguage,
  domNode,
  LanguageOpen,
  Language,
  setLanguageOpen,
  t,
}) {
  const history = useHistory();

  const handleSignup = () => {
    history.push("/signup");
  };
  return (
    <header className='landing-header'>
      <div className='vl-page-container'>
        <nav className='landing-navbar'>
          <figure className='brand-logo'>
            <img
              src={VaccineLedgerLogo}
              alt='vaccineledger'
              className='brand-logo-image'
            />
          </figure>
          <ul className='landing-navlist'>
            <li className='landing-nav-item'>
              <Link to='/' className='landing-nav-link active'>
                <p className='vl-body'>{t("home")}</p>
              </Link>
            </li>
            <li className='landing-nav-item'>
              <Link
                to='/'
                className='landing-nav-link'
                onClick={() => handleNavClick("service")}
              >
                <p className='vl-body'>{t("services")}</p>
              </Link>
            </li>
            <li className='landing-nav-item'>
              <Link
                to='/'
                className='landing-nav-link'
                onClick={() => handleNavClick("contact")}
              >
                <p className='vl-body'>{t("contact")}</p>
              </Link>
            </li>
            <li className='landing-nav-item mobile-nav-item'>
              <Link
                to={{
                  pathname: "https://gitlab.com/statwig-public/theledger",
                }}
                target='_blank'
                className='landing-nav-link'
              >
                <p className='vl-body'>{t("git_repo")}</p>
              </Link>
            </li>
            <li
              className={`landing-nav-item language-dropdown mobile-nav-item ${
                LanguageOpen && "active"
              }`}
              ref={domNode}
            >
              <section
                className={`language-select ${LanguageOpen && "active"}`}
                onClick={() => setLanguageOpen(!LanguageOpen)}
              >
                {Language === "en" ? (
                  <>
                    <div className='flag-circle'>
                      <img
                        src={EnglishFlag}
                        alt='flags'
                        className='flag-circle-image'
                      />
                    </div>

                    <p className='vl-body'>Eng</p>
                  </>
                ) : (
                  <>
                    <div className='flag-circle'>
                      <img
                        src={SpanishFlag}
                        alt='flags'
                        className='flag-circle-image'
                      />
                    </div>

                    <p className='vl-body'>Spa</p>
                  </>
                )}

                <i className='fa-solid fa-caret-down'></i>
              </section>
              {/* Dropdown */}
              <section className='language-list'>
                <article
                  className='language-card'
                  onClick={() => {
                    changeLanguage("en");
                  }}
                >
                  <div className='flag-circle'>
                    <img
                      src={EnglishFlag}
                      alt='flags'
                      className='flag-circle-image'
                    />
                  </div>

                  <p className='vl-body'>{t("english")}</p>
                </article>
                <article
                  className='language-card no-border'
                  onClick={() => {
                    changeLanguage("es");
                  }}
                >
                  <div className='flag-circle'>
                    <img
                      src={SpanishFlag}
                      alt='flags'
                      className='flag-circle-image'
                    />
                  </div>

                  <p className='vl-body'>{t("spanish")}</p>
                </article>
              </section>
            </li>
            <li className='landing-nav-item mobile-nav-item'>
              <button
                onClick={handleSignup}
                className='vl-btn vl-btn-sm vl-btn-secondary'
              >
                {t("signup")}
              </button>
            </li>

            {/* Mobile Link */}
            <li className='landing-nav-item tablet-menu-icon vl-link'>
              <div className='landing-nav-link active'>
                <i className='fa-solid fa-bars vl-body'></i>
              </div>
            </li>
          </ul>
          <div className='landing-nav-item mobile-menu-icon vl-link'>
            <div className='landing-nav-link active'>
              <i className='fa-solid fa-bars vl-body'></i>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
