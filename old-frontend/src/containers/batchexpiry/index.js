import React from "react";
import BatchExpiry from '../../components/batchexpiry';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const BatchExpiryContainer = props => {

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <BatchExpiry {...props} />
        </div>
      </div>
    </div>
  );
};

export default BatchExpiryContainer;

