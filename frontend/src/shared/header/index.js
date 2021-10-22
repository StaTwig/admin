import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

import DrawerMenu from "./drawerMenu";
import logo from "../../assets/aicons/AdminLogo.png";
import searchingIcon from "../../assets/icons/searching@2x.png";
// import bellIcon from "../../assets/icons/bellwhite.png";
import bellIcon from "../../assets/icons/bell.png"
import dropdownIcon from "../../assets/icons/DropdownIcon.png";
import { getUserInfo, logoutUser } from "../../actions/userActions";
import useOnclickOutside from "react-cool-onclickoutside";

const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const [sidebar, openSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const ref = useOnclickOutside(() => {
    setMenu(false);
  })

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  const onSeach = () => {
    props.history.push(`/tracing/${search}`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const profile = useSelector((state) => {
    return state.user;
  });
  const clearNotification = async (notification) => {};

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
          onClick={() => props.history.push("/overview")}
        />
      </div>
      <div className="actions">
        <div className="search-form d-none">
          <input
            type="text"
            //value={search}
            placeholder="Search"
            onChange={onSearchChange}
            className="form-control search-field"
          />
          <img src={searchingIcon} onClick={onSeach} alt="searching" />
        </div>
        <div className="user-info">
          <div className="notifications">
            <div
              className="bellicon-wrap"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <img src={bellIcon} alt="notification" />
              {notifications.length > 0 && (
                <span className="badge badge-light">
                  {notifications.length}
                </span>
              )}
            </div>
            {showNotifications && notifications.length > 0 && (
              <div className="slider-menu">
                <React.Fragment>
                  {notifications.map((notification) => (
                    <div className="slider-item">
                      <div
                        className="row justify-content-between align-items-center"
                        onClick={() => clearNotification(notification)}
                      >
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
                    </div>
                  ))}
                </React.Fragment>
              </div>
            )}
          </div>
          <div className="divider" />
          <div className="userName">
            <p className="cname">{profile?.organisation?.split("/")[0]}</p>
            <p className="uname">
              {profile?.firstName + " " + profile?.lastName}
            </p>
          </div>

          <div className="userPic">
            <img
              src={profile?.photoId}
              alt={profile?.firstName + " " + profile?.lastName}
              className="rounded rounded-circle"
              style={{color:"#0B65C1"}}
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
          <div ref={ref} className="slider-menu">
            {
              <React.Fragment>
                <div className="slider-item-text">
                  <p >{profile?.firstName + " " + profile?.lastName}</p>
                  <p>{profile?.organisation?.split("/")[0]}</p>
                </div>
                {/* <Link className="slider-item border-top-0" to="/profile">
                  My profile
                </Link>
                <div className="slider-item">Settings</div>
                <div className="slider-item">Change Password</div> */}
                <div
                  className="slider-item border-top-0"
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
