import React from "react";
import Summary from '../../components/inventorySummary';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const SummaryContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default SummaryContainer;

