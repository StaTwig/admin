import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, logoutUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import DrawerMenu from './drawerMenu';

import logo from '../../assets/brands/VACCINELEDGER.png';
import searchingIcon from '../../assets/icons/searching@2x.png';
import bellIcon from '../../assets/icons/bellwhite.png';
import userIcon from '../../assets/brands/user-image/Image73@2x.png';
import dropdownIcon from '../../assets/icons/drop-down.png';
import {getShipments, getShipmentsById} from "../../actions/shipmentActions";
import { getInventories, getInventoriesById} from "../../actions/inventoryActions";
import './style.scss';

const Header = props => {
  const [menu, setMenu] = useState(false);
  const [sidebar, openSidebar] = useState(false);
  const [search,setSearch] = useState('');

  function onSearchChange(e)
  {
    console.log(e.target.value);
    setSearch(e.target.value)
  }
  function onSeach(){
    if(search != '')
    {
      dispatch(getShipmentsById(search))
      dispatch(getInventoriesById(search))
    }
    dispatch(getShipments())
    dispatch(getInventories())
  }

  const profile = useSelector(state => {
    return state.user;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
 console.log(profile)
  return (
    <div className="header">
      <div className="branding">
        <div className="mobile-menu" onClick={() => openSidebar(true)}>
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
        <img src={logo} alt="vaccineledger" />
      </div>
      <div className="actions">
        <div className="search-form">
          <input 
            type="text" 
            // value={search} 
            onChange={onSearchChange} 
            className="form-control search-field" />
          <img 
            src={searchingIcon} 
            onClick={onSeach} 
            alt="searching" />
        </div>
        <div className="user-info">
          <div className="notifications">
            <img src={bellIcon} alt="notification" />
          </div>
          <div className="divider" />
          <div className="userName">
            <p className="cname">{profile.organisation}</p>
            <p className="uname">{profile.name}</p>
          </div>

          <div className="userPic">
            <img
              src={profile.profile_picture}
              alt="Jhon Name"
              className="rounded rounded-circle"
            />
          </div>
          <div className="userActions">
            <img
              src={dropdownIcon}
              alt="actions"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </div>
        {menu && (
          <div className="slider-menu">
            {
              <React.Fragment>
                <div className="slider-item-text">
                  <p>{profile.name}</p>
                  <p>{profile.organisation}</p>
                </div>
                <Link className="slider-item border-top-0" to="/profile">
                  My profile
                </Link>
                <div className="slider-item">Settings</div>
                <div className="slider-item">Change Password</div>
                <div
                  className="slider-item"
                  onClick={() => dispatch(logoutUser())}
                >
                  Logout
                </div>
              </React.Fragment>
            }
          </div>
        )}

        {sidebar && <DrawerMenu {...props} close={() => openSidebar(false)} />}
      </div>
    </div>
  );
};

export default Header;
