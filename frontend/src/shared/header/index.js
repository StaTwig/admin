import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import DrawerMenu from './drawerMenu';
import { getUserInfo, logoutUser } from '../../actions/userActions';
import logo from '../../assets/brands/VACCINELEDGER.png';
import searchingIcon from '../../assets/icons/searching@2x.png';
import bellIcon from '../../assets/icons/bellwhite.png';
import dropdownIcon from '../../assets/icons/drop-down.png';
import { getNotifications, deleteNotification } from '../../actions/notificationActions';
import { turnOff, turnOn } from "../../actions/spinnerActions";

const Header = props => {
  const [menu, setMenu] = useState(false);
  const [sidebar, openSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  function onSearchChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const onSeach = () => {
    props.history.push(`/tracing/${search}`);
  };

  const profile = useSelector(state => {
    return state.user;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    async function fetchApi() {
      dispatch(turnOn());
      const response = await getNotifications();
      setNotifications(response.data);
      dispatch(turnOff());
    }
    fetchApi();
  }, []);

  const clearNotification = async notification => {
    const response = await deleteNotification(notification._id);
    setNotifications(response.data);
  }

  return (
    <div className="header">
      <div className="branding">
        <div className="mobile-menu" onClick={() => openSidebar(true)}>
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
        <img
          src={logo}
          alt="vaccineledger"
          className="logo"
          onClick={() => props.history.push('/overview')}
        />
      </div>
      <div className="actions">
        <div className="search-form">
          <input
            type="text"
            // value={search}
            placeholder="Enter Shipment ID"
            onChange={onSearchChange}
            className="form-control search-field"
          />
          <img src={searchingIcon} onClick={onSeach} alt="searching" />
        </div>
        <div className="user-info">
          <div className="notifications">
            <div className="bellicon-wrap" onClick={() => setShowNotifications(!showNotifications)}>
              <img src={bellIcon} alt="notification" />
              {notifications.length > 0 && <span className="badge badge-light">{notifications.length }</span> }
            </div>
            {showNotifications && notifications.length > 0 && (
              <div className="slider-menu">
                <React.Fragment>
                  {notifications.map(notification =>  <div className="slider-item">
                    <div className="row justify-content-between align-items-center" onClick={() => clearNotification(notification)}>
                      <div className="col-sm-10">
                        <div>{notification.message}</div>
                      </div>
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="close"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  </div>)}
                </React.Fragment>
              </div>
            )}
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
