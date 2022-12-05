import React from "react";

import { Link } from "react-router-dom";
import HomeIcon from "../../assets/home.png";
import HomeSelectedIcon from "../../assets/home-selected.png";
import UserIcon from "../../assets/ManageUsers.png";
import UserSelectedIcon from "../../assets/ManageUsers-selected.png";
import AddressIcon from "../../assets/ManageAddress.png";
import AddressSelectedIcon from "../../assets/ManageAddress-selected.png";
import AffiliatedOrganisationIcon from "../../assets/AffiliatedOrganisation.png";
import AffiliatedOrganisationSelectedIcon from "../../assets/AffiliatedOrganisation-selected.png";
import "./style.scss";

const SideBar = ({ match, location }) => {
  const { url } = match;
  return (
    <div className="sidebar">
      <ul>
        {/* <li className={url === "/overview" ? "active" : ""}>
          <Link to="/overview">
            <img
              src={url === "/overview" ? HomeSelectedIcon : HomeIcon}
              alt="Overview"
            />
            <span className="pt-2 text-center">Overview</span>
          </Link>
        </li> */}
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
            <span className="pt-2 text-center">
              Manage
              <br />
              address
            </span>
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
            <span className="pt-2 text-center">
              Manage
              <br />
              Users
            </span>
          </Link>
        </li>
        <li className={url === "/affiliate" ? "active" : ""}>
          <Link to="/affiliate">
            <img
              src={
                url === "/affiliate"
                  ? AffiliatedOrganisationSelectedIcon
                  : AffiliatedOrganisationIcon
              }
              alt="Affiliate Organisation"
            />
            <span className="pt-2 text-center">
              Affiliate
              <br />
              Organisation
            </span>
          </Link>
        </li>
      </ul>
      {/* <Footer />*/}
    </div>
  );
};

export default SideBar;
