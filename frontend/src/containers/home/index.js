import React from 'react'
import './style.scss';
import logo from "../../assets/brands/VACCINELEDGER.png";
import lap from "../../assets/brands/laptop.png";
import icon from "../../assets/icons/block-icon.png";
import icon1 from "../../assets/icons/temprature-icon.png";
import icon2 from "../../assets/icons/location-icon.png";
import icon3 from "../../assets/icons/chain-icon.png";
import mob from "../../assets/brands/mobile.png";
import big from "../../assets/brands/blockchain-flow-diagram.png";
const HomeContainer = () => {
  return (
    <div className="Homecontainer">
      {/* Header */}
      <nav className="navbar sticky-top navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo} width="230" height="30" alt="logo" />
        </a>
        <button className="navbar-toggler" color="$black" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Track&Trace</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">Login <span className="sr-only">(current)</span></a>
            </li>
            <div className="divider" />
            <li className="nav-item">
              <a className="nav-link" href="#">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Header End */}
      <section className="Herobanner">
        <div className="container">
          <div className="row hero align-items-center">
            <div className="col-sm-6">
              <img src={logo} width="450" height="60" />
              <p className="hero-paragraph"> Vaccine ledger is a blockchain based platform<br></br>to track and trace vaccines journey acreoss the<br></br>supply chain</p>
            </div>
              <img src={lap} alt="vaccinedashboard" className="hero-image"/>
          </div>
        </div>
      </section>
      <section className="OurSolution">
        <div className="container solution">
          <h2 className="display-4">Our Solution</h2>
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon} width="60" height="60" />
                </div>
                <p>Blockchain based Platform</p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon1} width="60" height="60" />
                </div>
                <p>Live Temperature Tracking</p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon2} width="60" height="60" />
                </div>
                <p>Live Location Tracking</p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column justify-content-center">
                <div className="rounded-images">
                  <img src={icon3} width="60" height="60" />
                </div>
                <p>Visibility across SupplyChain</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what_we_do">
        <div className="container mt-5">
          <div className="row">
            <div className="col-7 align-text-center my-auto">
              <h2 className="display-4">What We Do</h2>
              <p>StaTwig provides serialization solutions to detect fake and expired products<br></br>in the production using blockchain technology and IoT.<br></br>We are focused towards creating an efficient food and vaccine distribution<br></br>supply cahin.This helps in preventing failures of distribution, predicting the<br></br>resources.Through our platform, we connect all stakeholders viatamper-<br></br>proof, open ledgers using our platform SC Blockchain</p>
            </div>
            <div className="col-5 align-items-center">
              <img src={mob} width="600" height="450" />
            </div>
          </div>
        </div>
      </section>
      <section className="How_it_works">
        <div className="container mt-5">
          <div className="row">
            <div className="col align-text-center mx auto">
              <h2 className="display-4">How it Works</h2>
              <img src={big} wdith="950" height="500" />
            </div>
          </div>
        </div>
      </section>
      <section className="contact_us">
        <div className="container mt-5 h-100">
          <div className="row h-100 align-items-center">
            <div className="d-flex flex-column">
              <h2 className="display-4">Contact Us</h2>
              <p>Interested in having chat with us about vaccine ledger ?<br></br>Drop your email below and we will get back to you shortly !</p>
              <form action="/email.php">
                <input type="text" placeholder="Enter Your Email Address" name="email" />
              </form>
            </div>
            <svg className="Line_1" viewBox="0 0 398 1">
              <path fill="transparent" stroke="rgba(112,112,112,1)" stroke-width="0.3px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" id="Line_1" d="M 0 0 L 398 0">
              </path>
            </svg>
            <div className="d-flex flex-row w-100 justify-content-between align-items-start">
              <img src={logo} width="260" height="30" />
              <p>© 2020 STATWIG</p>
              <p>Powered by Blockchain</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeContainer;