import React from "react";

import { Link } from "react-router-dom";
import Footer from "../footer";
import HomeIcon from "../../assets/aicons/home.png";
import HomeSelectedIcon from "../../assets/aicons/home-selected.png";
import UserIcon from "../../assets/aicons/ManageUsers.png";
import UserSelectedIcon from "../../assets/aicons/ManageUsers-selected.png";
import AddressIcon from "../../assets/aicons/ManageAddress.png";
import AddressSelectedIcon from "../../assets/aicons/ManageAddress-selected.png";
import AffiliatedOrganisationIcon from "../../assets/aicons/AffiliatedOrganisation.png";
import AffiliatedOrganisationSelectedIcon from "../../assets/aicons/AffiliatedOrganisation-selected.png";
import "./menu-style.scss";
const DrawerMenu = ({ match, location, close }) => {
  const { url } = match;
  return (
    <div className="mobilemenu">
      <div className="closedrawer" onClick={close}>
        <i className="fa fa-window-close" aria-hidden="true"></i>
      </div>
      <ul>
        <li className={url === "/overview" ? "active" : ""}>
          <Link to="/overview">
            <img
              src={url === "/overview" ? HomeSelectedIcon : HomeIcon}
              alt="Overview"
            />
            <span className="pt-2">Overview</span>
          </Link>
        </li>
        <li
          className={
            url === "/address" || url === "/newaddress" ? "active" : ""
          }
        >
          <Link to="/address">
            <img
              src={
                url === "/address" || url === "/newaddress"
                  ? AddressSelectedIcon
                  : AddressIcon
              }
              alt="Manage address"
            />
            <span className="pt-2">Manage address</span>
          </Link>
        </li>
        <li className={url === "/users" || url === "/addusers" ? "active" : ""}>
          <Link to="/users">
            <img
              src={
                url === "/users" || url === "/addusers"
                  ? UserSelectedIcon
                  : UserIcon
              }
              alt="Manage users"
            />
            <span className="pt-2">Manage Users</span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  );
};

export default DrawerMenu;
