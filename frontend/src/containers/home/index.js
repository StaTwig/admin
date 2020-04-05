import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileHeader from '../../shared/header/mobileHeader';

import './style.scss';
import logo from '../../assets/brands/VACCINELEDGER.png';
import icon from '../../assets/icons/block-icon.png';
import icon1 from '../../assets/icons/temprature-icon.png';
import icon2 from '../../assets/icons/location-icon.png';
import icon3 from '../../assets/icons/chain-icon.png';
import mob from '../../assets/brands/mobile.png';
const HomeContainer = (props) => {
  const user = useSelector(state => {
    return state.user
  });

  useEffect(() => {
    if (user) {
      props.history.push('/overview');
    }
  }, []);
  return (
    <div className="Homecontainer">
      {/* Header */}
      <MobileHeader/>
      <nav className="navbar sticky-top navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo} width="230" height="30" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          color="$black"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
              <a className="nav-link" href="#">
                Track & Trace
              </a>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/login">
                Login <span className="sr-only">(current)</span>
              </Link>
            </li>
            <div className="divider" />
            <li className="nav-item">
              <a className="nav-link" href="#">
                Signup
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Header End */}
      <section className="Herobanner">
        <div className="container">
          <div className="row hero align-items-center">
            <div className="col-sm-12 col-md-4">
              <img src={logo} width="350" height="50" />
              <p className="hero-paragraph">
                {' '}
                Vaccine ledger is a blockchain based platform to track and
                trace vaccines journey across thesupply chain
              </p>
            </div>
            <div className="hero-image" />
          </div>
        </div>
      </section>
      <section className="OurSolution pb-0">
        <div className="container solution">
          <h2 className="display-4">Our Solution</h2>
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon} width="40" height="40" />
                </div>
                <p>Blockchain based<br /> Platform</p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon1} width="40" height="40" />
                </div>
                <p>Live Temperature<br /> Tracking</p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon2} width="40" height="40" />
                </div>
                <p>Live Location<br /> Tracking</p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon3} width="40" height="40" />
                </div>
                <p>Visibility Across<br /> Supply Chain</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what_we_do pt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12 align-text-center my-auto">
              <h2 className="display-4">What We Do</h2>
              <p>
                StaTwig provides serialization solutions to detect fake and
                expired productsin the production using blockchain
                technology and IoT.<br />We are focused towards creating an
                efficient food and vaccine distribution supply cahin.This
                helps in preventing failures of distribution, predicting the resources.Through
                our platform, we connect all stakeholders viatamper-proof,
                open ledgers using our platform SC Blockchain
              </p>
            </div>
            <div className="col-md-6 align-items-center hide-sm">
              <img src={mob} width="100%" height="450" />
            </div>
          </div>
        </div>
      </section>
      <section className="How_it_works">
        <div className="container">
          <div className="row">
            <div className="col align-text-center mx auto">
              <h2 className="display-4">How it Works</h2>
              <div className="bg-work-flow"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_us">
        <div className="container">
          <div className="row h-100 align-items-center">
            <div className="d-flex flex-column">
              <h2 className="display-4">Contact Us</h2>
              <p>
                Interested in having chat with us about vaccine ledger ?<br />Drop
                your email below and we will get back to you shortly !
              </p>
              <div className="form form-inline">
                <input
                  type="text"
                  placeholder="Enter Your Email Address"
                  name="email"
                  className="form-control mr-3"
                />
                <button className="btn btn-primary btn-sm">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
          <img src={logo} width="260" height="30" />
          <p className="copywrite">© 2020 STATWIG</p>
          <p className="poweredby">Powered by Blockchain</p>
      </footer>
    </div>
  );
};

export default HomeContainer;
