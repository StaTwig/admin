import React from "react";
import { Link } from "react-router-dom";
import gitlab from "../assets/icons/gitlab_logo.png";
import MobileHeader from "../shared/header/mobileHeader";
import logo from "../assets/brands/VACCINELEDGER.png";

const NoMatch = () => (
  <React.Fragment>
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
      <div className='container'>
        <div className='error-template'>
          <h1>Oops!</h1>
          <h2>404 Page Not Found</h2>
          <div className='error-details'>Sorry, Requested page not found!</div>
          <div className='error-actions'>
            <Link to='/' className='btn btn-primary btn-lg'>
              <span className='glyphicon glyphicon-home'></span>
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default NoMatch;
