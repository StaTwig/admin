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
import googleStore from "../../assets/brands/Google_store.png";
import appleStore from "../../assets/brands/Apple_store.png";
import gitlab from "../../assets/icons/gitlab_logo.png";

const HomeContainer = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });

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
                Login <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <div className='divider' />
            <li className='nav-item'>
              <Link className='nav-link' to='/signup'>
                Signup
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
              <p className='hero-paragraph p-2'>
                VaccineLedger is a Blockchain based platform to track and trace
                vaccine's journey across the supply chain
              </p>
              <Link
                to={{
                  pathname:
                    "https://apps.apple.com/us/app/vaccineledger-lite/id1565684295",
                }}
                target='_blank'
              >
                <img
                  src={appleStore}
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
                  src={googleStore}
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
          <h2 className='display-4'>Our Solution</h2>
          <div className='row align-items-center'>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon} height='50' alt='BlockChain' />
                </div>
                <p>
                  Blockchain based
                  <br />
                  Platform
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon1} height='50' alt='Temperature' />
                </div>
                <p>
                  Live Temperature
                  <br />
                  Tracking
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon2} height='50' alt='Location' />
                </div>
                <p>
                  Live Location
                  <br /> Tracking
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='d-flex flex-column justify-content-center'>
                <div className='rounded-images'>
                  <img src={icon3} height='50' alt='Visibility' />
                </div>
                <p>
                  Visibility Across
                  <br /> Supply Chain
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
              <h2 className='display-4'>How it Works</h2>
              <div className='bg-work-flow'></div>
            </div>
          </div>
        </div>
      </section>

      <section className='contact_us'>
        <div className='container d-flex flex-row justify-content-between'>
          <div className='row h-100 align-items-center'>
            <div className='d-flex flex-column'>
              <h2 className='display-4'>Contact Us</h2>
              <p>
                Interested in having chat with us about VaccineLedger ?<br />
                Drop your email below and we will get back to you shortly !
              </p>
              <div className='form form-inline'>
                <input
                  type='text'
                  placeholder='Enter Your Email Address'
                  name='email'
                  className='form-control mr-3'
                />
                <button className='btn btn-primary btn-sm'>SUBMIT</button>
              </div>
            </div>
          </div>
          <div className='row h-100 align-items-center'>
            <div className='d-flex flex-column'>
              <h2 className='display-4'>Mobile Applications</h2>
              <p>
                Download the VaccineLedger Mobile app for Android Play Store ,
                iOS App Store
              </p>
              <div className='mt-1'>
                <Link
                  to={{
                    pathname:
                      "https://apps.apple.com/us/app/vaccineledger-lite/id1565684295",
                  }}
                  target='_blank'
                >
                  <img
                    src={appleStore}
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
                    src={googleStore}
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
        <p className='copywrite'>© 2021 STATWIG</p>
        <p className='poweredby'>Powered by Blockchain</p>
      </footer>
    </div>
  );
};

export default HomeContainer;
