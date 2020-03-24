import React from 'react'

import searchingIcon from "../../assets/icons/searching@2x.png";
import bellIcon from "../../assets/icons/bellwhite.png";
import userIcon from "../../assets/brands/user-image/Image73@2x.png";
import dropdownIcon from "../../assets/icons/drop-down.png";
import './style.scss'

const Header = props => {
  return (
    <div className="header">
      <div className="branding">
        <h1>VACCINE</h1><h1>LEDGER</h1>
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
          <div className="userName">Jhon Name</div>
          <div className="userPic">
            <img src={userIcon} alt="Jhon Name" className="rounded rounded-circle" />
          </div>
          <div className="userActions">
            <img src={dropdownIcon} alt="actions" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header;