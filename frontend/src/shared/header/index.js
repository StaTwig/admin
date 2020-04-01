import React from 'react';
import {
  Link
} from "react-router-dom";

import DropdownButton from '../dropdownbutton';
import searchingIcon from "../../assets/icons/searching@2x.png";
import bellIcon from "../../assets/icons/bellwhite.png";
import userIcon from "../../assets/brands/user-image/Image73@2x.png";
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
          <div className="userName">John Wilson</div>
          <Link to="/profile">
            <div className="userPic">
            <img src={userIcon} alt="Jhon Name" className="rounded rounded-circle" />
          </div>
          </Link>
          <div className="userActions">
         
          <DropdownButton/>
        
           
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header;


//<img src={dropdownIcon} alt="actions" />  */


/*<button onClick={handleLogout}> LOG OUT</button>

const dispatch = useDispatch();
  //dispatch(logoutUser());

  const handleLogout = () => { 
    console.log('logout clicked');
    dispatch(logoutUser());
    }  */