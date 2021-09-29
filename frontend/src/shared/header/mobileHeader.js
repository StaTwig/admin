import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/brands/VACCINELEDGER.png";

import "./mobile-header-style.scss";

const MobileHeader = (props) => {
  const [sidebar, openSidebar] = useState(false);

  return (
    <div className='mobile-header'>
      <Link className='branding' to='/'>
        <img src={logo} alt='vaccineledger' />
      </Link>
      <div className='actions'>
        <div className='mobile-menu' onClick={() => openSidebar(!sidebar)}>
          <i className='fa fa-bars' aria-hidden='true'></i>
        </div>
        {sidebar && (
          <div className='slider-menu nav flex-column'>
            <React.Fragment>
              <Link className='slider-item nav-link' to='/login'>
                Login
              </Link>
              <Link className='slider-item nav-link' to='/signup'>
                Sign Up
              </Link>
            </React.Fragment>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
