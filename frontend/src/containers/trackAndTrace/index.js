import React from "react";
import TrackandTrace from '../../components/trackAndTrace';
import Header from '../../components/shared/header';
import Sidebar from '../../components/shared/sidebarMenu';

const TrackandTraceContainer = () => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="content">
          <TrackandTrace />
        </div>
      </div>
    </div>
  );
};

export default TrackandTraceContainer;

