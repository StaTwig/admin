import React from "react";
import vaccineledger from "../../../assets/files/brands/vaccineledger.svg";
import profile from "../../../assets/files/profile/profile.jpg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import "../Header.css";

export default function StatwigHeader() {
  let location = useLocation();

  console.log(location.pathname);
  return (
    <header className='admin-header'>
      <div className='admin-container'>
        <nav className='admin-nav'>
          <article className='admin-nav-left'>
            <figure className='admin-logo'>
              <img src={vaccineledger} alt='vaccineledger' />
            </figure>
            <ul className='admin-nav-list'>
              <li className='admin-nav-item'>
                <Link
                  to='/statwig/dashboard'
                  className={`admin-nav-link ${
                    location.pathname === "/" && "active"
                  }`}
                >
                  <p className='vl-note'>Dashboard</p>
                </Link>
              </li>
              <li className='admin-nav-item'>
                <Link
                  to='/statwig/manage-organization'
                  className={`admin-nav-link ${
                    location.pathname === "/organization" && "active"
                  } ${location.pathname === "/locations" && "active"} ${
                    location.pathname === "/users" && "active"
                  }`}
                >
                  <p className='vl-note'>Manage Organization</p>
                </Link>
              </li>
            </ul>
          </article>
          <article className='admin-nav-right'>
            <ul className='admin-nav-list switch-button-container'>
              <li className='admin-nav-item configure-link'>
                <div className='switch-button'>
                  <p className='vl-note'>Admin</p>
                  <i className='fa-solid fa-caret-down'></i>
                </div>
                <div className={`configure-list active `}>
                  <button className='vl-btn vl-btn-sm vl-btn-full vl-btn-primary'>
                    Switch to User
                  </button>
                </div>
              </li>
              <li className='admin-nav-item'>
                <Link className='admin-nav-link'>
                  <Badge color='error' variant='dot'>
                    <i className='fa-solid fa-bell'></i>
                  </Badge>
                </Link>
              </li>
            </ul>
            <div className='admin-mini-profile'>
              <div className='admin-profile-card vl-flex-md'>
                <figure className='profile-space'>
                  <img src={profile} alt='profile' />
                </figure>
                <hgroup className='profile-name-card'>
                  <h1 className='vl-note vl-light f-700'>Johns Steven</h1>
                  <h2 className='vl-small vl-light f-400'>ABC Organization</h2>
                </hgroup>
              </div>
            </div>
            <div className='mobile-menu-icon'>
              <i className='fa-solid fa-bars vl-light'></i>
            </div>
          </article>
        </nav>
      </div>
    </header>
  );
}
