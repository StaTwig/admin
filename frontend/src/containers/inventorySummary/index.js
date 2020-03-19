import React from "react";
import Summary from '../../components/inventorySummary';
import Header from '../../components/shared/header';
import Sidebar from '../../components/shared/sidebarMenu';

const SummaryContainer = () => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="content">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default SummaryContainer;

