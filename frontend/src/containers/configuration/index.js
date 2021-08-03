import React, { useState, useEffect } from "react";
import Configuration from "../../components/configuration";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";

const ConfigurationContainer = (props) => {
  
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
         
          <Configuration
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigurationContainer;
