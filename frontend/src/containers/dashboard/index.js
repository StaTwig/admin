import React from "react";
import DashBoard from '../../components/dashboard';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import './style.scss'

const DashBoardContainer = props => {
      return (
            <div className="container-fluid p-0">
                  <Header {...props} />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                       <DashBoard {...props} />
                        </div>
                  </div>
            </div>
      );
};

export default DashBoardContainer;
