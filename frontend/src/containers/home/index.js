import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MobileHeader from "../../shared/header/mobileHeader";
import "./style.scss";
import logo from "../../assets/brands/VACCINELEDGER.png";
import icon from "../../assets/icons/block-icon.png";
import icon1 from "../../assets/icons/temprature-icon.png";
import icon2 from "../../assets/icons/location-icon.png";
import icon3 from "../../assets/icons/chain-icon.png";
import googleStore from "../../assets/brands/Google_store.webp";
import appleStore from "../../assets/brands/Apple_store.webp";
import blockflow from "../../assets/brands/blockchain-flow-diagram.webp";
import blockflowEs from "../../assets/brands/blockchain-flow-diagram-es.webp";
import googleStoreEs from "../../assets/brands/Google_store_es.webp";
import appleStoreEs from "../../assets/brands/Apple_store_es.webp";
import gitlab from "../../assets/icons/gitlab_logo.png";
import { useTranslation } from "react-i18next";

const HomeContainer = (props) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => {
    return state.user;
  });
  const lang = i18n.language;
  const changeLanguage = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    if (user) {
      props.history.push("/overview");
    }
  }, [props.history, user]);
  return (
    <div className='Homecontainer'>
      <MobileHeader />
      <nav className='navbar sticky-top navbar-expand-lg'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} width='230' height='30' alt='logo' />
        </Link>
        <button
          className='navbar-toggler'
          color='$black'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active mr-2'>
              <Link
                to={{ pathname: "https://gitlab.com/statwig-public/theledger" }}
                target='_blank'
              >
                <img src={gitlab} width='40' height='35' alt='Gitlab' />
              </Link>
            </li>
            <div className='divider' />
            <li className='nav-item active'>
              <Link className='nav-link' to='/login'>
                {t("login")} <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <div className='divider' />
            <li className='nav-item'>
              <Link className='nav-link' to='/signup'>
                {t("signup")}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Header End */}
      <section className='Herobanner'>
        <div className='container'>
          <div className='row hero align-items-center'>
            <div className='col-sm-12 col-md-4'>
              <img src={logo} width='400' height='50' alt='VaccineLedger' />
              <p className='hero-paragraph p-2'>{t("description")}</p>
              <Link
                to={{
                  pathname:
                    "https://apps.apple.com/us/app/vaccineledger-lite/id1565684295",
                }}
                target='_blank'
              >
                <img
                  src={
                    t("english") === "English"
                      ? appleStore
                      : t("english") === "Inglés"
                      ? appleStoreEs
                      : appleStore
                  }
                  width='165'
                  height='50'
                  alt='Apple App Store'
                />
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link
                to={{
                  pathname:
                    "https://play.google.com/store/apps/details?id=com.thevaccineledger",
                }}
                target='_blank'
              >
                <img
                  src={
                    t("english") === "English"
                      ? googleStore
                      : t("english") === "Inglés"
                      ? googleStoreEs
                      : googleStore
                  }
                  width='165'
                  height='50'
                  alt='Google Play Store'
                />
              </Link>
            </div>
            <div className='hero-image' />
          </div>
        </div>
      </section>
      <section className='OurSolution pb-0'>
        <div className='container solution'>
          <h2 className='display-4'>{t("our_solution")}</h2>
          <div className='row align-items-center'>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon} height='50' alt='BlockChain' />
                </div>
                <p>
                  {t("blockchain_based")}
                  <br />
                  {t("platform")}
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon1} height='50' alt='Temperature' />
                </div>
                <p>
                  {t("live_temperature")}
                  <br />
                  {t("tracking")}
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon2} height='50' alt='Location' />
                </div>
                <p>
                  {t("live_temperature")}
                  <br /> {t("tracking")}
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon3} height='50' alt='Visibility' />
                </div>
                <p>
                  {t("visibility_across")}
                  <br /> {t("supply_chain")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='How_it_works'>
        <div className='container'>
          <div className='row'>
            <div className='col align-text-center mx auto'>
              <h2 className='display-4'> {t("how_it_works")}</h2>
              <div
                style={{
                  background: `url(${
                    t("english") === "English"
                      ? blockflow
                      : t("english") === "Inglés"
                      ? blockflowEs
                      : blockflowEs
                  })`,
                }}
                className='bg-work-flow'
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className='contact_us'>
        <div className='container d-flex flex-row justify-content-between'>
          <div className='row h-100 align-items-center'>
            <div className='d-flex flex-column'>
              <h2 className='display-4'>{t("contact_us")}</h2>
              <p>
                {t("contact_us_description.part1")}
                <br />
                {t("contact_us_description.part2")}
              </p>
              <div className='form form-inline'>
                <input
                  type='text'
                  placeholder={t("enter_your_email_address")}
                  name='email'
                  className='form-control mr-3'
                />
                <button className='btn btn-primary btn-sm'>
                  {t("submit")}
                </button>
              </div>
            </div>
          </div>
          <div className='row h-100 align-items-center'>
            <div className='d-flex flex-column'>
              <h2 className='display-4'>{t("mobile_applications")}</h2>
              <p>{t("mobile_applications_description")}</p>
              <div className='mt-1'>
                <Link
                  to={{
                    pathname:
                      "https://apps.apple.com/us/app/vaccineledger-lite/id1565684295",
                  }}
                  target='_blank'
                >
                  <img
                    src={
                      t("english") === "English"
                        ? appleStore
                        : t("english") === "Inglés"
                        ? appleStoreEs
                        : appleStore
                    }
                    width='165'
                    height='50'
                    alt=' Apple App Store'
                    className='mr-3'
                  />
                </Link>
                <Link
                  to={{
                    pathname:
                      "https://play.google.com/store/apps/details?id=com.thevaccineledger",
                  }}
                  target='_blank'
                >
                  <img
                    src={
                      t("english") === "English"
                        ? googleStore
                        : t("english") === "Inglés"
                        ? googleStoreEs
                        : googleStore
                    }
                    width='165'
                    height='50'
                    alt='Google Play Store'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <img src={logo} width='230' height='30' alt='Logo' />
        <p className='copywrite'>
          © {new Date().getFullYear()} {t("statwig")}
        </p>
        <p className='poweredby'>
          {t("powered_by_blockchain")} &nbsp;
          <select
            className='language cursorP'
            value={lang}
            onChange={changeLanguage}
          >
            <option value='en'>{t("english")}</option>
            <option value='es'>{t("spanish")}</option>
          </select>
        </p>
      </footer>
    </div>
  );
};

export default HomeContainer;
