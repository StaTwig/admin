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
import user from '../../assets/icons/user.svg';
import { getNotifications, deleteNotification } from '../../actions/notificationActions';
import { turnOff, turnOn } from "../../actions/spinnerActions";
import useOnclickOutside from 'react-cool-onclickoutside';
import { config } from "../../config";
const Header = props => {
  const [menu, setMenu] = useState(false);
  const [sidebar, openSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
const ref = useOnclickOutside(() => {
    setMenu(false);
  });
  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  const onSeach = () => {
    if(search.substring(0,2)=="po"||search.substring(0,2)=="PO")
    props.history.push(`/vieworder/${search}`);
    else if(search.substring(0,2)=="sh"||search.substring(0,2)=="SH")
    props.history.push(`/viewshipment/${search}`);;
  };

  const profile = useSelector(state => {
    return state.user;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    async function fetchApi() {
      const response = await getNotifications();
      setNotifications(response.data);
    }
    fetchApi();
  }, []);

  const clearNotification = async notification => {
    const response = await deleteNotification(notification._id);
    setNotifications(response.data);
  }

  const onkeydown = (event) => {
    if (event.keyCode  === 13) {
      onSeach();
    }
   }
const imgs = config().fetchProfileImage;

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
        <div className="search-form" tabIndex="-1" onKeyDown={onkeydown}>
          <input
            type="text"
            // value={search}
            placeholder="Search by PO ID/Shipment ID/ Product ID"
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Search by PO ID/Shipment ID/ Product ID'}
            onChange={onSearchChange}
            className="form-control search-field"
          />
          <img src={searchingIcon} onClick={onSeach} alt="searching" />
        </div>
        <div className="user-info">
          {/* <div className="notifications">
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
          </div> */}
          <div className="divider" />
          <div className="userName">
            <p className="cname">{profile?.organisation?.split('/')[0]}</p>
            <p className="uname">{profile.warehouseAddress_city}</p>
          </div>

          <div className="userPic">
            <img
              src={`${imgs}${profile.photoId}` ? `${imgs}${profile.photoId}` : user}
              alt=""
              className={`rounded rounded-circle ${`${imgs}${profile.photoId}` ? `` :`img-thumbnail bg-transparent border-0`}`}
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
          <div className="slider-menu" ref={ref}>
            {
              <React.Fragment>
                <div className="slider-item-text">
                  <p>{profile.name}</p>
                  <p>{profile?.organisation?.split('/')[0]}</p>
                </div>
                <Link className="slider-item border-top-0" to="/profile">
                  My profile
                </Link>
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
