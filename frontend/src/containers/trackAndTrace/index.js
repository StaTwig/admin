import React from "react";
import TrackandTrace from '../../components/trackAndTrace';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const TrackandTraceContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <TrackandTrace />
        </div>
      </div>
    </div>
  );
};

export default TrackandTraceContainer;

