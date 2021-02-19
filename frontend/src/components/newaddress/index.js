import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import AddressField from "./addressfield";

const NewAddress = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="container-fluid ml-3 mr-3">
      <div className="rowDash pr-4">
        <div className="dashboard">
          <h1 className="breadcrumb dash">ADD NEW ADDRESS</h1>
        </div>
      </div>
      <div className="d-flex row">
        <div className="card w-100 rounded border border-white shadow bg-white m-4 p-3">
          <div className="card-body d-flex flex-row justify-content-between">
            <div className="w-50">
              <form className="mb-3">
                <AddressField label="Address Type" refe="addresstype" />
                <AddressField label="Pincode" refe="pincode" />
                <AddressField
                  label="Flat, House No, Building, Company"
                  refe="flatno"
                />
                <AddressField
                  label="Area, Colony, Street, District, Sector, Village"
                  refe="area"
                />
                <AddressField label="Landmark" refe="landmark" />
                <AddressField label="Town/ City" refe="town" />
                <AddressField label="State/ Province/ Region" refe="state" />
                <AddressField label="Country" refe="country" />
                <div className="pt-5">
                  <button type="button" className="btn btn-warning ">
                    <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
                    <span className="txt">Add New Address</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="w-50 ml-5 d-flex flex-row justify-content-between">
              <div className="pt-1 w-50 d-flex flex-row-reverse">
                <button type="button" className="btn btn-primary btn-sm">
                  <span className="txt">Use my current location</span>
                </button>
              </div>
              <div className="pl-1 w-75 pt-1">
                <p className="txtColor font-13">
                  This will auto populate/ auto fill every information that is
                  shown mandatory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
