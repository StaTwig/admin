import React, { useEffect, useState } from "react";
import vaccineledger from "../../../assets/files/brands/vaccineledger.svg";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Header.css";
import { useSelector } from "react-redux";
import { getImage } from "../../../../actions/notificationActions";

export default function StatwigHeader() {
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
			getImage(user?.photoId).then((result) => {
				setImage(result?.data);
			});
		}

		setName(userName);
		setOrgName(org);
	}, [user]);

	const handleUiSwitch = () => {
		history.push("/overview");
	};

	return (
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
									to="/statwig/dashboard"
									className={`admin-nav-link ${
										location.pathname === "/statwig/dashboard" && "active"
									}`}
								>
									<p className="vl-note">Dashboard</p>
								</Link>
							</li>
							<li className="admin-nav-item">
								<Link
									to="/statwig/manage-organization"
									className={`admin-nav-link ${
										location.pathname === "/statwig/manage-organization" && "active"
									} ${location.pathname.includes("/statwig/view-locations") && "active"} ${
										location.pathname.includes("/statwig/view-users") && "active"
									}`}
								>
									<p className="vl-note">Manage Organization</p>
								</Link>
							</li>
							<li className="admin-nav-item">
								<Link
									to="/statwig/roles"
									className={`admin-nav-link ${location.pathname === "/statwig/roles" && "active"}`}
								>
									<p className="vl-note">Configuration</p>
								</Link>
							</li>
						</ul>
					</article>
					<article className="admin-nav-right">
						<ul className="admin-nav-list switch-button-container">
							<li className="admin-nav-item configure-link">
								<div className="switch-button">
									<p className="vl-note">Admin</p>
									<i className="fa-solid fa-caret-down"></i>
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
                <Link className="admin-nav-link">
                  <Badge color="error" variant="dot">
                    <i className="fa-solid fa-bell"></i>
                  </Badge>
                </Link>
              </li> */}
						</ul>
						<div className="admin-mini-profile">
							<div className="admin-profile-card vl-flex-md">
								{image && (
									<figure className="profile-space">
										<img src={image} alt="profile" />
									</figure>
								)}
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
