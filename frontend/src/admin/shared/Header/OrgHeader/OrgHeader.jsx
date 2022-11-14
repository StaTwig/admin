import React, { useEffect } from "react";
import vaccineledger from "../../../assets/files/brands/vaccineledger.svg";
import profile from "../../../assets/files/profile/profile.jpg";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import "../Header.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getImage } from "../../../../actions/notificationActions";

export default function OrgHeader() {
  let location = useLocation();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
	const [orgName, setOrgName] = useState("");
	const [image, setImage] = useState("");

  useEffect(() => {
    let userName = user?.firstName;
    let org = user?.organisation?.split("/")[0];
		if (user?.photoId) {
			getImage(profile?.photoId).then((result) => {
				setImage(result?.data);
			});
		}

    setName(userName);
    setOrgName(org);
  }, [user]);

  const handleUiSwitch = () => {
    history.push("/overview");
  }

  console.log(location.pathname);
  return (
<<<<<<< HEAD
		<header className="admin-header">
			<div className="admin-container">
				<nav className="admin-nav">
					<article className="admin-nav-left">
						<figure className="admin-logo">
							<img src={vaccineledger} alt="vaccineledger" />
						</figure>
						<ul className="admin-nav-list">
							<li className="admin-nav-item">
								<Link
									to="/org/dashboard"
									className={`admin-nav-link ${location.pathname === "/" && "active"}`}
								>
									<p className="vl-note">Dashboard</p>
								</Link>
							</li>
							<li className="admin-nav-item">
								<Link
									to="/org/manage-users"
									className={`admin-nav-link ${
										location.pathname === "/org/manage-users" && "active"
									}`}
								>
									<p className="vl-note">Manage Users</p>
								</Link>
							</li>
							<li className="admin-nav-item configure-link">
								<div
									className={`admin-nav-link ${location.pathname === "/org/roles" && "active"} ${
										location.pathname === "/org/product-list" && "active"
									}`}
								>
									<p className="vl-note">
										<span className="link-right-space">Configuration</span>
										<i class="fa-solid fa-caret-down"></i>
									</p>
								</div>
								<div className={`configure-list active `}>
									<Link to="/org/roles" className="btn-dropdown-card vl-link">
										<p className="vl-note f-500">Roles & Permission</p>
									</Link>
									<Link to="/org/product-list" className="btn-dropdown-card vl-link">
										<p className="vl-note f-500">Product List</p>
									</Link>
								</div>
							</li>
						</ul>
					</article>
					<article className="admin-nav-right">
						<ul className="admin-nav-list switch-button-container">
							<li className="admin-nav-item configure-link">
								<div className="switch-button">
									<p className="vl-note">Admin</p>
									<i class="fa-solid fa-caret-down"></i>
								</div>
								<div className={`configure-list active `}>
									<button
										onClick={handleUiSwitch}
										className="vl-btn vl-btn-sm vl-btn-full vl-btn-primary"
									>
										Switch to User
									</button>
								</div>
							</li>
							{/* <li className="admin-nav-item">
=======
    <header className="admin-header">
      <div className="admin-container">
        <nav className="admin-nav">
          <article className="admin-nav-left">
            <figure className="admin-logo">
              <img src={vaccineledger} alt="vaccineledger" />
            </figure>
            <ul className="admin-nav-list">
              <li className="admin-nav-item">
                <Link
                  to="/org/dashboard"
                  className={`admin-nav-link ${
                    location.pathname === "/" && "active"
                  }`}
                >
                  <p className="vl-note">Dashboard</p>
                </Link>
              </li>
              <li className="admin-nav-item">
                <Link
                  to="/org/manage-users"
                  className={`admin-nav-link ${
                    location.pathname === "/org/manage-users" && "active"
                  }`}
                >
                  <p className="vl-note">Manage Users</p>
                </Link>
              </li>
              <li className="admin-nav-item">
                <Link
                  to="/org/product-list"
                  className={`admin-nav-link ${
                    location.pathname === "/org/manage-users" && "active"
                  }`}
                >
                  <p className="vl-note">Products List</p>
                </Link>
              </li>
            </ul>
          </article>
          <article className="admin-nav-right">
            <ul className="admin-nav-list switch-button-container">
              <li className="admin-nav-item configure-link">
                <div className="switch-button">
                  <p className="vl-note">Admin</p>
                  <i class="fa-solid fa-caret-down"></i>
                </div>
                <div className={`configure-list active `}>
                  <button className="vl-btn vl-btn-sm vl-btn-full vl-btn-primary">
                    Switch to User
                  </button>
                </div>
              </li>
              <li className="admin-nav-item">
>>>>>>> 73c156d7b6a647ba965425b122acf8716be02cd2
                <Link className="admin-nav-link">
                  <Badge color="error" variant="dot">
                    <i className="fa-solid fa-bell"></i>
                  </Badge>
                </Link>
              </li> */}
						</ul>
						<div className="admin-mini-profile">
							<div className="admin-profile-card vl-flex-md">
								<figure className="profile-space">
									<img src={image} alt="profile" />
								</figure>
								<hgroup className="profile-name-card">
									<h1 className="vl-note vl-light f-700">{name}</h1>
									<h2 className="vl-small vl-light f-400">{orgName}</h2>
								</hgroup>
							</div>
						</div>
						<div className="mobile-menu-icon">
							<i className="fa-solid fa-bars vl-light"></i>
						</div>
					</article>
				</nav>
			</div>
		</header>
	);
}
