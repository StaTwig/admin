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

import Configration from "../../assets/aicons/configration.png";
import AffiliatedOrganisationSelectedIcon from "../../assets/aicons/AffiliatedOrganisation-selected.png";
import "./style.scss";

const SideBar = ({ match, location, user }) => {
  const { url } = match;
  return (
    <div className="sidebar">
      <ul>
        <li className={url === "/overview" ? "active" : ""}>
          <Link to="/overview">
            <img
              src={url === "/overview" ? HomeSelectedIcon : HomeIcon}
              alt="Overview"
            />
            <span className="pt-2 text-center">Overview</span>
          </Link>
        </li>
        {user.type == "CENTRAL_AUTHORITY" && (
          <li className={url === "/organisation" ? "active" : ""}>
            <Link to="/organisation">
              <img
                src={
                  url === "/organisation"
                    ? AffiliatedOrganisationSelectedIcon
                    : AffiliatedOrganisationIcon
                }
                alt="Organisation"
              />
              <span className="pt-2 text-center">
                Manage
                <br />
                Organisation
              </span>
            </Link>
          </li>
        )}
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
        <li className={url === "/configuration" ? "active" : ""}>
          <Link to="/configuration">
            <img
              src={url === "/Configration" ? Configration : Configration}
              alt="configuration"
            />
            <span className="pt-2 text-center">configuration</span>
          </Link>
        </li>
      </ul>
      <Footer />
    </div>
  );
};

export default SideBar;
