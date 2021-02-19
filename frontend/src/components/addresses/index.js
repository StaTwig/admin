import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import AddressDetails from "./addressdetails";
import { Link } from "react-router-dom";

const Address = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="container-fluid ml-5 mr-3">
      <div className="rowDash pr-4">
        <div className="dashboard">
          <h1 className="breadcrumb dash">MANAGE ADDRESS</h1>
        </div>
        <div>
          <button type="button" className="btn btn-warning ">
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <Link to="/newaddress" className="forgot-link text-decoration-none">
              <span className="txt ">Add New Address</span>
            </Link>
          </button>
        </div>
      </div>
      <div className="d-flex row">
        <AddressDetails />
        <AddressDetails />
        <AddressDetails />
        <AddressDetails />
        <AddressDetails />
        <AddressDetails />
        <AddressDetails />
      </div>
    </div>
  );
};

export default Address;
