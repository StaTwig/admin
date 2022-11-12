import React from "react";
import { Link } from "react-router-dom";
import LocationCard from "../../../common/LocationCard/LocationCard";
import TileCard from "../../../common/TileCard/TileCard";
import "./ViewUsers.css";
import UserTable from "./UserTable/UserTable";
import StatwigHeader from "../../../shared/Header/StatwigHeader/StatwigHeader";

export default function ViewUsers() {
  return (
    <>
      <StatwigHeader />
      <section className="admin-page-layout">
        <div className="admin-container">
          <div className="admin-location-container admin-section-space">
            <div className="admin-locations-left">
              <div className="previous-link-tabs">
                <Link
                  to="/statwig/view-locations"
                  className="link-card vl-link"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  <p className="vl-subheading f-500">Manage Users</p>
                </Link>
                <div className="breadcumb-links vl-flex-sm">
                  <Link to="/statwig/view-locations" className="vl-link">
                    <p className="vl-small f-500 vl-grey-sm">
                      Manage Locations
                    </p>
                  </Link>
                  <p className="vl-note f-500 vl-grey-sm">/</p>
                  <Link to="/statwig/view-users" className="vl-link">
                    <p className="vl-small f-500 vl-grey-sm">Users</p>
                  </Link>
                </div>
              </div>
              <div className="location-details-grid">
                <LocationCard layout="user" />
                <TileCard layout="user" />
              </div>
            </div>

            <UserTable />
          </div>
        </div>
      </section>
    </>
  );
}
