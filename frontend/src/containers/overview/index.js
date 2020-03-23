import React from "react";
import OverView from '../../components/overview';
import Header from '../../components/shared/header';
import Sidebar from '../../components/shared/sidebarMenu';

const OverviewContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <OverView />
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;

