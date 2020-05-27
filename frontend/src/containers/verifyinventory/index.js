import React from "react";
import VerifyInventory from '../../components/verifyinventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const VerifyInventoryContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <VerifyInventory {...props}/>
        </div>
      </div>
    </div>
  );
};

export default VerifyInventoryContainer;

