import React, { useState, useEffect } from "react";
import Address from "../../components/addresses";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getWareHouses } from "../../actions/organisationActions";

const AddressContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWareHouses());
  }, []);

  const addresses = useSelector((state) => {
    return state.organisation.addresses;
  });

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Address {...props} addresses={addresses} />
        </div>
      </div>
    </div>
  );
};

export default AddressContainer;
