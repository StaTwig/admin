import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";
import { logoutUser } from '../../actions/userActions';
import { useDispatch } from 'react-redux';
import DrawerMenu from "./drawerMenu";

import logo from '../../assets/brands/vaccineledger.png';
import searchingIcon from "../../assets/icons/searching@2x.png";
import bellIcon from "../../assets/icons/bellwhite.png";
import userIcon from "../../assets/brands/user-image/Image73@2x.png";
import dropdownIcon from "../../assets/icons/drop-down.png";


import './style.scss'

const Header = props => {
  const [menu, setMenu] = useState(false);
  const [sidebar, openSidebar] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="branding">
        <div className="mobile-menu" onClick={() => openSidebar(true)}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <img src={logo} alt="vaccineledger" />
      </div>
      <div className="actions">
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <img src={searchingIcon} alt="searching" />
        </div>
        <div className="user-info">
          <div className="notifications">
            <img src={bellIcon} alt="notification" />
          </div>
          <div className="divider" />
          <div className="userName">
            <p className="cname">ABC Pvt Ltd.</p>
            <p className="uname">Jhon Doe</p>
          </div>

          <div className="userPic">
            <img src={userIcon} alt="Jhon Name" className="rounded rounded-circle" />
          </div>
          <div className="userActions">
            <img src={dropdownIcon} alt="actions" onClick={() => setMenu(!menu)} />
          </div>
        </div>
        {
          menu && <div className="slider-menu">
            {
              <React.Fragment>
                <div className="slider-item-text">
                  <p>Jhon Wilson</p>
                  <p>ABC Pvt. Ltd.</p>
                </div>
                <Link className="slider-item border-top-0" to="/profile">My profile</Link>
                <div className="slider-item">
                  Settings
                </div>
                <div className="slider-item">
                  Change Password
                </div>
                <div className="slider-item" onClick={() => dispatch(logoutUser())}>
                  Logout
                </div>
              </React.Fragment>

            }
          </div>
        }

        {
          sidebar && <DrawerMenu {...props} close={() => openSidebar(false)} />
        }
      </div>
    </div>
  )
}

export default Header;
