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
import Configration from "../../assets/aicons/configration.png";

import "./style.scss";

const SideBar = ({ match, location, user }) => {
  const { url } = match;
  return (
    <div className="sidebar">
      <ul>
        <li className={url === "/overview" ? "active" : ""}>
          <Link to="/overview" className="d-inline-block">
            <img
              src={url === "/overview" ? HomeSelectedIcon : HomeSelectedIcon}
              alt="Overview"
            />
            <span className="ml-2">Overview</span>
          </Link>
        </li>
        {user.type == "CENTRAL_AUTHORITY" && (
          <li className={url === "/organisation" ? "active" : ""}>
            <Link to="/organisation" className="d-inline-block">
              <img
                src={
                  url === "/organisation"
                    ? AffiliatedOrganisationSelectedIcon
                    : AffiliatedOrganisationSelectedIcon
                }
                alt="Organisation"
              />
              <span className="ml-2">
                Manage Organisation
              </span>
            </Link>
          </li>
        )}
        <li
          className={
            url === "/address" || url === "/newaddress" ? "active" : ""
          }
        >
          <Link to="/address" className="d-inline-block">
            <img
              src={
                url === "/address" || url === "/newaddress"
                  ? AddressSelectedIcon
                  : AddressSelectedIcon
              }
              alt="Manage address"
            />
            <span className="ml-2">
              Manage Address
            </span>
          </Link>
        </li>
        <li className={url === "/users" || url === "/addusers" ? "active" : ""}>
          <Link to="/users" className="d-inline-block">
            <img
              src={
                url === "/users" || url === "/addusers"
                  ? UserSelectedIcon
                  : UserSelectedIcon
              }
              alt="Manage users"
            />
            <span className="ml-2">
              Manage Users
            </span>
          </Link>
        </li>
        <li className={url === "/configuration" ? "active" : ""}>
          <Link to="/configuration" className="d-inline-block">
            <img
              src={url === "/Configration" 
                  ? Configration 
                  : Configration
                }
              alt="configuration"
            />
            <span className="ml-2">
            Configuration
            </span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  );
};

export default SideBar;
